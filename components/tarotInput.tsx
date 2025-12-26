"use client";

import ResponseModal from "./responseModal";
import { useTarot } from "../lib/useTarot";

export default function TarotInput() {
  const {
    question,
    setQuestion,
    response,
    displayedText,
    loading,
    error,
    selectedCards,
    ask,
    reset,
  } = useTarot();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col w-full max-w-2xl">
        <div className="flex items-center bg-white text-black rounded-full md:px-6 px-3 md:py-3 py-1.5 shadow-xl">
          <input
            className="flex-1 min-w-0 bg-transparent outline-none text-lg"
            placeholder="Input your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={ask}
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
          onClose={reset}
        />
      )}
    </div>
  );
}
