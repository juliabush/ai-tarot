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
