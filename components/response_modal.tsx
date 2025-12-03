import { TarotCard } from "./tarot_input";
import TarotCardDisplay from "./tarot_card_display";

interface ResponseModalProps {
  question: string;
  displayedText: string;
  selectedCards: TarotCard[];
  loading: boolean;
  onClose: () => void;
}

export default function ResponseModal({
  question,
  displayedText,
  selectedCards,
  loading,
  onClose,
}: ResponseModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
      <div className="bg-white text-black rounded-3xl p-10 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"></div>
      <h2 className="text-3xl font-bold mb-6 text-center">
        {question.trim().endsWith("?")
          ? question.trim()
          : question.trim() + "?"}
      </h2>
      <TarotCardDisplay selectedCards={selectedCards} />
    </div>
  );
}
