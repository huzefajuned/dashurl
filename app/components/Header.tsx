"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button";
import useAuthStore from "../store/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from '../../public/logo.png'

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, loginWithGoogle } = useAuthStore();

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Analytics", href: "#analytics" },
  ];

  const activeMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 ">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="logo" className="h-10 w-36" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all hover:ring-primary">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          ) : (
            <ShinyButton onClick={loginWithGoogle}>Sign In</ShinyButton>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={activeMenu}>
            {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMenu && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setShowMenu(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-border/40">
              {user ? (
                <div className="flex items-center gap-3 px-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                    <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.displayName}</span>
                </div>
              ) : (
                <ShinyButton onClick={() => { loginWithGoogle(); setShowMenu(false); }} className="w-full justify-center">
                  Sign In
                </ShinyButton>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
