"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Copy, ExternalLink, Activity, MousePointerClick } from "lucide-react";
import { format } from "date-fns";
import type { shortedUrlsProps } from "../types/types";
import { Spinner } from "@/app/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { formatUrl } from "../lib/common";

const AnalyticsDashboard = () => {
  const [shortedUrls, setShortedUrls] = useState<shortedUrlsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/url");
      if (data && data.urls) {
        setShortedUrls(data.urls);
      }
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (shortedUrls.length === 0) {
    return null; // Don't show anything if no URLs
  }

  const totalClicks = shortedUrls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="analytics">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track the performance of your shortened links.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shortedUrls.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Links</CardTitle>
          <CardDescription>A list of your recently shortened URLs and their performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Original URL</TableHead>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortedUrls.map((url, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium max-w-[300px] truncate" title={url.originalUrl}>
                      {url.originalUrl || "Unknown"}
                    </TableCell>
                    <TableCell>
                      <a href={url.shortUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        {formatUrl(url.shortUrl)}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        <span>{url.clicks || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {url.createdAt ? format(new Date(url.createdAt), 'MMM d, yyyy') : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(url.shortUrl)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={url.shortUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
