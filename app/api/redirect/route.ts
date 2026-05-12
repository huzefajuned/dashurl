import type { NextRequest } from "next/server";
import { connectDB } from "../db/connection";
import { isValidUrl } from "@/app/lib/common";
import { UrlModel } from "../model/url.model";

export async function POST(req: NextRequest) {
  try {
    // DB Connction check
    await connectDB();

    // pickup the originla url form  req body
    const body = await req.json();
    const shortUrl = await body.shortUrl;

    // validate the url in server
    if (isValidUrl(shortUrl)) {
      console.log("shortUrl is :", shortUrl);

      // Check if URL already exists
      const urlDoc = await UrlModel.findOneAndUpdate(
        { 
          shortUrl,
          $or: [
            { expiresAt: { $exists: false } },
            { expiresAt: { $gt: new Date() } }
          ]
        },
        { $inc: { clicks: 1 } },
        { new: true }
      );

      if (urlDoc) {
        return new Response(
          JSON.stringify({
            originalUrl: urlDoc,
            message: "redirecting please wait! ⌛⌛",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // Either not found or expired
        await UrlModel.deleteOne({ shortUrl, expiresAt: { $lte: new Date() } });
        return new Response(JSON.stringify({ error: "URL not found or expired" }), { status: 404 });
      }
    }
  } catch (error) {
    console.log("error in redirect", error);
  }
}
