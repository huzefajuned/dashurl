import type React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import type { ShareModelProps } from "../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Copy, Facebook, Twitter, Smartphone, ExternalLink } from "lucide-react";

const ShareModel: React.FC<ShareModelProps> = ({ title, closeMe }) => {
  const [open, setOpen] = useState(true);

  // When internal dialog closes, trigger parent close
  useEffect(() => {
    if (!open) {
      setTimeout(closeMe, 150); // slight delay for animation
    }
  }, [open, closeMe]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    toast.success("URL copied to clipboard!");
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(title)}`,
      icon: <Smartphone className="h-4 w-4 mr-2" />,
      color: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(title)}`,
      icon: <Twitter className="h-4 w-4 mr-2" />,
      color: "bg-blue-400 hover:bg-blue-500 text-white",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(title)}`,
      icon: <Facebook className="h-4 w-4 mr-2" />,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Your short URL is ready!</DialogTitle>
          <DialogDescription>
            Scan the QR code or share the link below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <QRCode value={title} size={160} />
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <div className="flex-1 truncate bg-muted/50 px-3 py-2 rounded-md border text-sm text-muted-foreground">
              {title}
            </div>
            <Button variant="secondary" size="icon" onClick={copyToClipboard} title="Copy URL">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" asChild title="Open link">
              <a href={title} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="w-full">
            <p className="text-sm font-medium mb-3 text-center">Share via</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {shareOptions.map((option) => (
                <Button 
                  key={option.name} 
                  variant="outline" 
                  className={`w-full ${option.color} border-0`} 
                  asChild
                >
                  <a href={option.url} target="_blank" rel="noopener noreferrer">
                    {option.icon} {option.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModel;
