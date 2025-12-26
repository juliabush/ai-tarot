export interface TarotCard {
  name: string;
  url: string;
}

export interface VideoCardProps {
  src: string;
  videoRef: React.Ref<HTMLVideoElement>;
}

export interface ResponseModalProps {
  question: string;
  displayedText: string;
  selectedCards: TarotCard[];
  loading: boolean;
  onClose: () => void;
}
