import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import useAuthStore from "../store/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import FooterSkeleton from "./skeletons/Footer-Skeleton";
import { Button } from "./ui/button";

const Footer = () => {
  const { user, loading, loginWithGoogle, logout } = useAuthStore();

  if (loading) return <FooterSkeleton />;

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Developed with <span className="text-red-500">❤️</span> by Huzefa Bin Juned
          </span>
          <span className="hidden md:inline-block text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            Passionate Full Stack Developer
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/huzefajuned"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <p className="text-sm  font-medium"> latest@v1 </p>

          <a
            href="https://www.linkedin.com/in/huzefajuned"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>

          <div className="h-4 w-px bg-border hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-1 ring-border">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={loginWithGoogle}>
              Login
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground flex items-center mt-0">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
