import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

const FooterSkeleton = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Developer Name Skeleton */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-4 hidden md:inline-block" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Social Icons & Avatar Skeleton */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="h-4 w-px bg-border hidden sm:block"></div>
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        {/* Copyright Text Skeleton */}
        <div className="flex items-center mt-4 md:mt-0">
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
