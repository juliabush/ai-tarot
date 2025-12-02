"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TarotInput from "@/components/tarot_input";
import VideoCard from "@/components/video_card";

export default function HomePage() {
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  useEffect(() => {
    videoRefs.forEach((ref) => ref.current?.play());
  }, []);

  return <div></div>;
}
