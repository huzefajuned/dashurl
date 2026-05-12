"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SingleUrl from "./SingleUrl";
import type { shortedUrlsProps } from "../types/types";
import { Spinner } from "@/app/components/ui/spinner";
import { ShinyButton } from "./ui/shiny-button";

const ShortedUrls = () => {
  const [shortedUrls, setShortedUrls] = useState<shortedUrlsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log("shortedUrls :", shortedUrls);

  // RETRIEVE ALL SHORTED URLs
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await axios.get("/api/url");

        // console.log("data ", data);
        if (data && data.status === 200) {
          toast.success(`${data.data.message}`);
          setShortedUrls(data.data.urls);
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 items-center text-center mt-2 px-4">
      <h1 className="text-xl sm:text-3xl font-bold text-center">Recent Short URLs</h1>
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
        {shortedUrls.length > 0 && !loading ? (
          <>
            <SingleUrl shortedUrls={shortedUrls} />
            <ShinyButton
              onClick={() => toast.success("please wait . we`r working on")}
              className="px-2 py-2 bg-gray-300"
            >
              Load more
            </ShinyButton>
          </>
        ) : (
          <p className="text-gray-700">No URLs have been shortened yet.</p>
        )}
      </div>
      {loading && <Spinner  />}
    </div>
  );
};

export default ShortedUrls;
