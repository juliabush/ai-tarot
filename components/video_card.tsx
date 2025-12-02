"use client";

interface VideoCradProps {
  src: string;
  videoRef: React.Ref<HTMLVideoElement>;
}

export default function VideoCard({ src, videRef }: VideoCardProps) {
  return <div className="flex flex-col items-center"></div>;
}
