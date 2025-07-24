import type { Card, CardsByType, CardSuit } from '@/types/card';
import { cards as allCardsData, type Card as RawCard } from '../../../../data/cards';

// Re-export the Card type for convenience
export type { Card } from '@/types/card';

// Convert the data/cards.ts format to match our Card interface
function convertCardData(rawCard: RawCard): Card {
  return {
    id: rawCard.id,
    code: rawCard.code,
    name: rawCard.name,
    description: rawCard.description,
    type: rawCard.code.startsWith('MAJ_') ? 'major' : 'minor',
    suit: rawCard.code.startsWith('VIALS_') ? 'vials' :
          rawCard.code.startsWith('TOOLS_') ? 'tools' :
          rawCard.code.startsWith('COMMS_') ? 'comms' :
          rawCard.code.startsWith('GEAR_') ? 'gear' : undefined,
    number: rawCard.code.startsWith('MAJ_') ? 
            parseInt(rawCard.code.split('_')[1]) :
            rawCard.code.includes('ACE') ? 1 :
            rawCard.code.includes('PAGE') ? 'page' :
            rawCard.code.includes('KNIGHT') ? 'knight' :
            rawCard.code.includes('QUEEN') ? 'queen' :
            rawCard.code.includes('KING') ? 'king' :
            parseInt(rawCard.code.split('_')[1]) || 0,
    image: `/cards/${rawCard.code}.png`,
    prompt: rawCard.prompt,
    meanings: {
      upright: [rawCard.description],
      reversed: [`Opposition to ${rawCard.description.toLowerCase()}`]
    },
    keywords: rawCard.description.split(', ')
  };
}

export function getAllCards(): Card[] {
  return allCardsData.map(convertCardData);
}

export function getCardByCode(code: string): Card | null {
  const rawCard = allCardsData.find(card => card.code === code);
  return rawCard ? convertCardData(rawCard) : null;
}

export function getCardsByType(): CardsByType {
  const allCards = getAllCards();
  const organized: CardsByType = {
    major: [],
    minor: {
      tools: [],
      vials: [],
      comms: [],
      gear: [],
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

  organized.minor.tools = sortBySuitRank(organized.minor.tools);
  organized.minor.vials = sortBySuitRank(organized.minor.vials);
  organized.minor.comms = sortBySuitRank(organized.minor.comms);
  organized.minor.gear = sortBySuitRank(organized.minor.gear);

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
    tools: 'Tools',
    vials: 'Vials',
    comms: 'Comms',
    gear: 'Gear'
  };
  return names[suit];
}

export function getSuitDescription(suit: CardSuit): string {
  const descriptions: Record<CardSuit, string> = {
    tools: 'Fire • Action, creation, engineering, ambition',
    vials: 'Water • Resources, emotions, sustenance, life force',
    comms: 'Air • Information, strategy, communication, truth',
    gear: 'Earth • Equipment, material wealth, security, territory'
  };
  return descriptions[suit];
}
