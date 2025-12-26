import { TarotCard } from "../components/tarot_input";

export function pickRandomCards(cards: TarotCard[], count = 3) {
  const copy = [...cards];
  const picked: TarotCard[] = [];
  while (picked.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(index, 1)[0]);
  }
  return picked;
}
