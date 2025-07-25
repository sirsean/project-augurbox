export interface Card {
  id: number;
  code: string;
  name: string;
  description: string;
  type: 'major' | 'minor';
  suit?: CardSuit;
  number: number | string;
  image: string;
  prompt: string;
  meanings: {
    upright: string[];
    reversed: string[];
  };
  keywords: string[];
}

export type CardSuit = 'tools' | 'vials' | 'comms' | 'gear';

export interface CardsByType {
  major: Card[];
  minor: {
    tools: Card[];
    vials: Card[];
    comms: Card[];
    gear: Card[];
  };
}
