"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TarotInput from "@/components/tarotInput";
import VideoCard from "@/components/videoCard";
import { useTypewriterText } from "@/lib/useTypewriterText";

export default function HomePage() {
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  useEffect(() => {
    videoRefs.forEach((ref) => ref.current?.play());
  }, []);

  const displayedText = useTypewriterText(
    "Your question, the Universe's answer"
  );

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 flex flex-col items-center mt-4 md:mt-24 px-4">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest mb-6 md:mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </motion.h1>

        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <TarotInput />
        </motion.div>

        <motion.div
          className="flex gap-6 md:gap-12 mt-8 md:mt-14 flex-wrap justify-center"
          initial="hidden"
          animate="visible"
        >
          {videoRefs.map((ref, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <VideoCard
                videoRef={ref}
                src={`main-page-vids/tarot-${i + 1}.mp4`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
