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
