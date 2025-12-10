"use client";

import { useState, useEffect } from "react";
import tarotCards from "@/tarot-json/tarot-loop.json";
import TarotCardDisplay from "./tarot_card_display";
import ResponseModal from "./response_modal";
import { pickRandomCards } from "../lib/tarot_utils";
import { typeWriterAppend } from "../lib/typewriter";

export interface TarotCard {
  name: string;
  url: string;
}

export default function TarotInput() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);

  async function handleAsk() {
    if (!question.trim()) {
      setError("Please enter a question before asking.");
      return;
    }

    setError("");
    setLoading(true);
    setResponse(null);
    setDisplayedText("");
    setSelectedCards([]);

    const cards = pickRandomCards(tarotCards, 3);
    setSelectedCards(cards);

    const cardNames = cards.map((c) => c.name).join(", ");
    const prompt = `Question: ${question.trim()}${
      question.trim().endsWith("?") ? "" : "?"
    } 
Tarot cards drawn: ${cardNames}. Include these cards in your answer.`;

    try {
      const res = await fetch("/api/ask-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
      });

      if (!res.body) throw new Error("No response body.");

      const queue: string[] = [];
      let fullText = "";
      let animationActive = true;

      async function runTypewriter() {
        while (animationActive) {
          if (queue.length > 0) {
            const nextChar = queue.shift()!;
            setDisplayedText((prev) => prev + nextChar);
          }
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      runTypewriter();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter(Boolean);
          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              if (
                parsed.type === "response.output_text.delta" &&
                parsed.delta
              ) {
                queue.push(...parsed.delta.split(""));
                fullText += parsed.delta;
              }
            } catch {}
          }
        }
      }

      animationActive = false;
      setResponse(fullText);
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Failed to fetch the response. Please try again.");
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (loading || response)) {
        setResponse(null);
        setDisplayedText("");
        setSelectedCards([]);
        setQuestion("");
        setError("");
        setLoading(false);
      }
      if (e.key === "Enter") handleAsk();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, response, question]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col w-full max-w-2xl">
        <div className="flex items-center bg-white text-black rounded-full md:px-6 px-3 md:py-3 py-1.5 shadow-xl">
          <input
            className="flex-1 min-w-0 bg-transparent outline-none text-lg"
            placeholder="Input your question here..."
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (error) setError("");
            }}
          />
          <button
            onClick={handleAsk}
            className="bg-purple-600 text-white rounded-full px-5 md:py-3 py-1.5"
          >
            Ask
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2 px-6">{error}</p>}
      </div>

      {(loading || response) && (
        <ResponseModal
          question={question}
          displayedText={displayedText}
          selectedCards={selectedCards}
          loading={loading}
          onClose={() => {
            setResponse(null);
            setDisplayedText("");
            setSelectedCards([]);
            setQuestion("");
            setError("");
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}
