"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { isValidUrl } from "../lib/common";
import axios from "axios";
import ShareModel from "./ShareModel";
import { Input } from "@/app/components/ui/input";
import { Spinner } from "@/app/components/ui/spinner";
import { ShinyButton } from "@/app/components/ui/shiny-button";
import { Clipboard, Link2, Zap, BarChart3, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

const Hero = () => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [newShortedUrl, setNewShortedUrl] = useState<string>("");
  const [isShortLived, setIsShortLived] = useState<boolean>(false);
  const [lifespan, setLifespan] = useState<string>("30");

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText);
      toast.success("Pasted from clipboard!");
    } catch (err) {
      console.log("Err :", err);
      toast.error("Failed to paste");
    }
  };

  const shortUrl = async (url: string) => {
    setLoading(true);
    try {
      const payload: { url: string; expiresIn?: string } = { url };
      if (isShortLived) {
        payload.expiresIn = lifespan;
      }
      const response = await axios.post("/api/url", payload);
      
      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message || "URL shortened successfully");
        setNewShortedUrl(response.data.newUrl.shortUrl);
        setShowModel(true);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err?.response?.data?.error || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit_ = () => {
    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL!");
    } else {
      shortUrl(url);
    }
  };

  const features = [
    {
      title: "Lightning Fast",
      description: "Get your shortened links in milliseconds.",
      icon: <Zap className="h-6 w-6 text-amber-400" />
    },
    {
      title: "Powerful Analytics",
      description: "Track clicks, referrers, and locations.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />
    },
    {
      title: "Secure & Reliable",
      description: "Your data is encrypted and safe with us.",
      icon: <ShieldCheck className="h-6 w-6 text-secondary" />
    }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-4rem)] pt-16 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/15 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/15 blur-[120px] -z-10" />

      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
          Shorten Your Links <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Share the World
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10">
          Transform long, complex URLs into short, memorable links. Track performance with powerful analytics and generate instant QR codes.
        </p>

        <div className="w-full max-w-3xl bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-2 sm:p-4 shadow-2xl flex flex-col sm:flex-row gap-3 items-center relative transition-all focus-within:ring-2 focus-within:ring-primary/50">
          <div className="hidden sm:flex items-center pl-4 text-muted-foreground">
            <Link2 className="h-6 w-6" />
          </div>
          <div className="w-full flex-1 relative flex items-center">
            <Input
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit_()}
              type="url"
              value={url}
              placeholder="Paste your long URL here..."
              className="w-full border-0 bg-transparent shadow-none text-base sm:text-lg focus-visible:ring-0 px-2 sm:px-4 py-6 pr-10"
              disabled={loading}
            />
            <button
              onClick={handlePaste}
              className="absolute right-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard className="h-5 w-5" />
            </button>
          </div>
          <ShinyButton
            onClick={onSubmit_}
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 text-white" /> : "Shorten Now"}
          </ShinyButton>
        </div>

        {/* Short-lived options */}
        <div className="w-full max-w-3xl mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
          <label className="flex items-center cursor-pointer space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 accent-primary rounded cursor-pointer"
              checked={isShortLived} 
              onChange={(e) => setIsShortLived(e.target.checked)} 
            />
            <span>Make this URL short-lived</span>
          </label>
          
          {isShortLived && (
            <select 
              value={lifespan} 
              onChange={(e) => setLifespan(e.target.value)} 
              className="bg-background/80 border border-border/50 text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 backdrop-blur-xl"
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="3600">1 hour</option>
            </select>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full" id="features">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-300">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="p-3 bg-muted rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {showModel && (
          <ShareModel
            title={newShortedUrl}
            closeMe={() => setShowModel(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
