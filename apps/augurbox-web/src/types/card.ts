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

export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface CardsByType {
  major: Card[];
  minor: {
    wands: Card[];
    cups: Card[];
    swords: Card[];
    pentacles: Card[];
  };
}
