import { useState, useEffect } from "react";
import tarotCards from "@/tarot-json/tarot-loop.json";
import { pickRandomCards } from "./tarot_utils";
import { askTarot } from "./askTarot";
import { TarotCard } from "./types";

export function useTarot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);

  async function ask() {
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

    try {
      const fullText = await askTarot({
        question,
        cards,
        onDelta: (char) => setDisplayedText((prev) => prev + char),
      });

      setResponse(fullText);
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Failed to fetch the response. Please try again.");
    }
  }

  function reset() {
    setResponse(null);
    setDisplayedText("");
    setSelectedCards([]);
    setQuestion("");
    setError("");
    setLoading(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (loading || response)) reset();
      if (e.key === "Enter") ask();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, response, question]);

  return {
    question,
    setQuestion,
    response,
    displayedText,
    loading,
    error,
    selectedCards,
    ask,
    reset,
  };
}
