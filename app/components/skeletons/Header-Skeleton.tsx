import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

const HeaderSkeleton = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Logo Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Navigation Links Skeleton */}
      <nav className="hidden md:flex items-center gap-6">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </nav>

      {/* Right side (Theme Toggle + Auth) Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-9 rounded-md hidden md:block" />
        <Skeleton className="h-10 w-24 rounded-md hidden md:block" />
        <Skeleton className="h-9 w-9 rounded-md md:hidden" />
        <Skeleton className="h-9 w-9 rounded-md md:hidden" />
      </div>
    </div>
  </header>
);

export default HeaderSkeleton;
