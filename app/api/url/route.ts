// pages/api/shorten.js
import type { NextRequest } from "next/server";
import { connectDB } from "../db/connection";
import { UrlModel } from "../model/url.model";
import { nanoid } from "nanoid";

// CREATE NEW SHORT URL
export async function POST(req: NextRequest) {
  try {
    // DB Connction check
    await connectDB();

    // pickup the originla url form  req body
    const body = await req.json();
    const originalUrl = (await body?.url) || "";
    const expiresIn = body?.expiresIn;
    const dynamicHost = req.nextUrl.origin;
    const host = dynamicHost ?? process.env.NEXT_PUBLIC_HOST_URL;


    if (!originalUrl) {
      return new Response("URL is required", { status: 400 });
    }

    // Check if URL already exists
    const alreadyExists = await UrlModel.findOne({ originalUrl });
    if (alreadyExists) {
      return new Response(
        JSON.stringify({
          shortUrl: alreadyExists.shortUrl,
          message: "URL already exixts!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // if not already exists ,
    // then  Generate short URL
    const uniqueID = nanoid(8); // Generates an 8-character unique ID
    const shortURL = `${host}/${uniqueID}`;

    let expiresAt = undefined;
    if (expiresIn) {
      expiresAt = new Date(Date.now() + parseInt(expiresIn) * 1000);
    }

    const newUrl = await UrlModel.create({
      originalUrl: originalUrl,
      shortUrl: shortURL,
      expiresAt: expiresAt,
    });
    // await UrlModel.save();

    return new Response(JSON.stringify({ newUrl, message: "URL  created!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /shorten:", error);
    return new Response("Server Error", { status: 500 });
  }
}

// GET SHORT URLS
export async function GET() {
  try {
    // DB Connction check
    await connectDB();

    //  for now i am fetching all urls in one
    //  later i'll add pagination
    // exclude originalUrl
    const urls = await UrlModel.find()
      .sort({ _id: -1 })
      .limit(1)
      .select("-originalUrl");


    return new Response(JSON.stringify({ urls, message: "URLs fetched!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Server Error", { status: 500 });
  }
}
