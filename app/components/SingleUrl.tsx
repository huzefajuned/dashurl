"use client";
import React, { useState } from "react";
import type { SingleUrlProps, UrlDetails } from "../types/types";
import QRCode from "react-qr-code";
import ShareModel from "./ShareModel";
import { formatUrl } from "../lib/common";

const SingleUrl = ({ shortedUrls }: SingleUrlProps) => {
  // simple state for show/hide ShareModel Component.
  const [show, setShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("");

  const showUrlDetails = (url: UrlDetails) => {
    setCurrent(url.shortUrl);
    setShow(true);
  };


  return (
    <div className=" flex flex-col gap-3  w-11/12 sm:w-1/2">
      {shortedUrls.map((url, index: number) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        // biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation>
        <div
          onClick={() => showUrlDetails(url)}
          key={`${index * 2}`}
          className="flex flex-row justify-between items-center w-full p-3 sm:p-4 bg-card hover:bg-muted border border-border/50 rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          <div className="bg-white p-1 rounded-md shrink-0">
            <QRCode
              value={url.shortUrl}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center ml-4 flex-1 overflow-hidden">
            <p className="text-muted-foreground font-medium mr-2 text-xs sm:text-sm">
              Short URL:
            </p>
            <a
              href={url.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold text-sm sm:text-base truncate max-w-full"
            >
              {formatUrl(url.shortUrl)}
            </a>
          </div>
        </div>
      ))}
      {show && <ShareModel title={current} closeMe={() => setShow(false)} />}
    </div>
  );
};

export default SingleUrl;
