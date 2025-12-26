import { TarotCard } from "../lib/types";

export default function TarotCardDisplay({
  selectedCards,
}: {
  selectedCards: TarotCard[];
}) {
  return (
    <div className="flex justify-center gap-6 mb-6 flex-wrap">
      {selectedCards.map((card) => (
        <div key={card.name} className="flex flex-col items-center">
          <img
            src={card.url}
            alt={card.name}
            className="w-36 h-56 object-cover rounded-lg border-2 border-purple-600"
          />
          <span className="mt-2 font-semibold text-purple-600 text-center">
            {card.name}
          </span>
        </div>
      ))}
    </div>
  );
}
