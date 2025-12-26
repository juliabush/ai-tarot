import React from "react";

export function formatTarotResponse(text: string) {
  const cleanedText = text.replace(/\d+\.\s*/g, "").replace(/:\s*/g, "");
  const parts = cleanedText.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <p key={idx} className="mb-4">
          <strong>{part.slice(2, -2)}</strong>
        </p>
      );
    }

    return (
      <p key={idx} className="mb-4">
        {part}
      </p>
    );
  });
}
