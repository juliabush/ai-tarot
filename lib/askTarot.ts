import { TarotCard } from "./types";

export async function askTarot({
  question,
  cards,
  onDelta,
}: {
  question: string;
  cards: TarotCard[];
  onDelta: (char: string) => void;
}): Promise<string> {
  const cardNames = cards.map((c) => c.name).join(", ");

  const prompt = `Question: ${question.trim()}${
    question.trim().endsWith("?") ? "" : "?"
  } 
Tarot cards drawn: ${cardNames}. Include these cards in your answer.`;

  const res = await fetch("/api/ask-gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: prompt }),
  });

  if (!res.body) throw new Error("No response body.");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
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
          if (parsed.type === "response.output_text.delta" && parsed.delta) {
            parsed.delta.split("").forEach(onDelta);
            fullText += parsed.delta;
          }
        } catch {}
      }
    }
  }

  return fullText;
}
