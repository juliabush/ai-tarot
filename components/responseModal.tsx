import TarotCardDisplay from "./tarot_card_display";
import { ResponseModalProps } from "../lib/types";
import { formatTarotResponse } from "../lib/formatTarotResponse";

export default function ResponseModal({
  question,
  displayedText,
  selectedCards,
  loading,
  onClose,
}: ResponseModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
      <div className="bg-white text-black rounded-3xl p-10 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {question.trim().endsWith("?")
            ? question.trim()
            : question.trim() + "?"}
        </h2>

        <TarotCardDisplay selectedCards={selectedCards} />

        <div className="mb-8 text-lg leading-snug text-center break-words">
          {displayedText
            ? formatTarotResponse(displayedText)
            : "Consulting the cards..."}
        </div>

        {!loading && (
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
