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

  const fullText = "Your question, the Universe's answer";
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  return <div></div>;
}
