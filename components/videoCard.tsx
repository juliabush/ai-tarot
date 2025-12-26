"use client";
import { VideoCardProps } from "../lib/types";

// displays the cards on the main page as gifs
export default function VideoCard({ src, videoRef }: VideoCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="md:w-[330px] md:h-[560px] w-[120px] h-[200px] rounded-xl overflow-hidden shadow-xl border-4 border-blue-300">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
