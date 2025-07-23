import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import type { Card, CardsByType, CardSuit } from '@/types/card';

const cardsDataPath = join(process.cwd(), 'data', 'cards');

export function getAllCards(): Card[] {
  try {
    const files = readdirSync(cardsDataPath).filter(file => file.endsWith('.yaml'));
    const cards: Card[] = [];

    for (const file of files) {
      const filePath = join(cardsDataPath, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const cardData = yaml.load(fileContent) as Card;
      cards.push(cardData);
    }

    // Sort cards by ID to maintain consistent order
    return cards.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
}

export function getCardByCode(code: string): Card | null {
  try {
    const filePath = join(cardsDataPath, `${code}.yaml`);
    const fileContent = readFileSync(filePath, 'utf8');
    return yaml.load(fileContent) as Card;
  } catch (error) {
    console.error(`Error loading card ${code}:`, error);
    return null;
  }
}

export function getCardsByType(): CardsByType {
  const allCards = getAllCards();
  const organized: CardsByType = {
    major: [],
    minor: {
      wands: [],
      cups: [],
      swords: [],
      pentacles: [],
    }
  };

  for (const card of allCards) {
    if (card.type === 'major') {
      organized.major.push(card);
    } else if (card.type === 'minor' && card.suit) {
      const suit = card.suit as CardSuit;
      if (organized.minor[suit]) {
        organized.minor[suit].push(card);
      }
    }
  }

  // Sort each suit by card number/rank
  const sortBySuitRank = (cards: Card[]) => {
    return cards.sort((a, b) => {
      const aNum = typeof a.number === 'string' ? getSuitRankOrder(a.number) : a.number;
      const bNum = typeof b.number === 'string' ? getSuitRankOrder(b.number) : b.number;
      return aNum - bNum;
    });
  };

  organized.minor.wands = sortBySuitRank(organized.minor.wands);
  organized.minor.cups = sortBySuitRank(organized.minor.cups);
  organized.minor.swords = sortBySuitRank(organized.minor.swords);
  organized.minor.pentacles = sortBySuitRank(organized.minor.pentacles);

  return organized;
}

function getSuitRankOrder(rank: string): number {
  const order: Record<string, number> = {
    'page': 11,
    'knight': 12,
    'queen': 13,
    'king': 14,
  };
  return order[rank] || 0;
}

export function getSuitDisplayName(suit: CardSuit): string {
  const names: Record<CardSuit, string> = {
    wands: 'Wands',
    cups: 'Cups',
    swords: 'Swords',
    pentacles: 'Pentacles'
  };
  return names[suit];
}

export function getSuitDescription(suit: CardSuit): string {
  const descriptions: Record<CardSuit, string> = {
    wands: 'Fire • Creativity, passion, energy, career',
    cups: 'Water • Emotions, relationships, intuition, spirituality',
    swords: 'Air • Thoughts, communication, conflict, intellect', 
    pentacles: 'Earth • Material matters, money, health, practical concerns'
  };
  return descriptions[suit];
}
