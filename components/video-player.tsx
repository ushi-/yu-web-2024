"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  url: string;
};

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient || hasError ? (
    <div className={cn("absolute inset-0 bg-foreground")}>
      <div
        className={cn(
          "w-full h-full transition-opacity",
          ready ? "opacity-100" : "opacity-0"
        )}
      >
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          onReady={() => setReady(true)}
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  ) : null;
};

export default VideoPlayer;
