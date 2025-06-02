"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, X, Maximize, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type VideoGalleryProps = {
  videos: string[];
};

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = (video: string) => {
    setActiveVideo(video);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Helper function to get thumbnail from video URL (in a real app this would be more sophisticated)
  const getThumbnailUrl = (videoUrl: string) => {
    // For demo purposes, we'll use a placeholder
    return "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative aspect-video bg-muted rounded-md overflow-hidden group cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <img
              src={getThumbnailUrl(video)}
              alt={`Video thumbnail ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="rounded-full bg-black/50 p-2">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!activeVideo}
        onOpenChange={(open) => !open && setActiveVideo(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black">
          <DialogHeader>
            <DialogTitle>Video</DialogTitle>
          </DialogHeader>
          <div className="relative">
            {activeVideo && (
              <video
                ref={videoRef}
                src={activeVideo}
                className="w-full h-auto"
                onEnded={handleVideoEnded}
                muted={isMuted}
                playsInline
                controls={false}
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>

                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
