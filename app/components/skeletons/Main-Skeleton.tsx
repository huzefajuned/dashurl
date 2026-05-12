import React from "react";
import HeaderSkeleton from "./Header-Skeleton";
import FooterSkeleton from "./Footer-Skeleton";
import { Skeleton } from "@/app/components/ui/skeleton";

const MainSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HeaderSkeleton />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        {/* Hero Section Skeleton */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 mt-10">
          <Skeleton className="h-16 w-3/4 sm:w-2/3" />
          <Skeleton className="h-16 w-1/2" />
          
          <Skeleton className="h-6 w-full max-w-md mt-4" />
          
          <div className="w-full h-24 rounded-2xl mt-8">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>

        {/* Features / Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center p-6 border border-border/50 rounded-xl bg-background/50">
               <Skeleton className="h-12 w-12 rounded-full mb-4" />
               <Skeleton className="h-6 w-32 mb-2" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-4/5 mt-1" />
            </div>
          ))}
        </div>
      </main>

      <FooterSkeleton />
    </div>
  );
};

export default MainSkeleton;
