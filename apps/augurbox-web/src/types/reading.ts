export interface Spread {
  id: string;
  name: string;
  lore_name: string;
  description: string;
  positions: Position[];
}

export interface Position {
  id: string;
  name: string;
  description: string;
  x: number; // Position on spread layout (percentage)
  y: number; // Position on spread layout (percentage)
}

export interface DrawnCard {
  card_code: string;
  position_id: string;
  is_reversed: boolean;
  is_revealed: boolean;
}

export interface Reading {
  id: string;
  spread_id: string;
  drawn_cards: DrawnCard[];
  created_at: string;
  synthesis?: string; // AI-generated reading summary
}

export interface CardMeaning {
  text: string;
  drifter_prompt: string; // The introspective question
}

// The three spreads from the plan
export const SPREADS: Spread[] = [
  {
    id: 'supply_run',
    name: 'Three Card Spread',
    lore_name: 'The Supply Run',
    description: 'A simple three-card spread for Past, Present, Future',
    positions: [
      { id: 'past', name: 'Past', description: 'What led to this situation', x: 25, y: 50 },
      { id: 'present', name: 'Present', description: 'The current state of affairs', x: 50, y: 50 },
      { id: 'future', name: 'Future', description: 'Where this path leads', x: 75, y: 50 }
    ]
  },
  {
    id: 'system_scan',
    name: 'Five Card Spread',
    lore_name: 'System Scan',
    description: 'A five-card spread for Situation, Obstacle, Advice, Person, Outcome',
    positions: [
      { id: 'situation', name: 'Situation', description: 'The current state of things', x: 50, y: 20 },
      { id: 'obstacle', name: 'Obstacle', description: 'What stands in your way', x: 20, y: 50 },
      { id: 'advice', name: 'Advice', description: 'Guidance for moving forward', x: 80, y: 50 },
      { id: 'person', name: 'Person', description: 'Someone who influences this matter', x: 50, y: 80 },
      { id: 'outcome', name: 'Outcome', description: 'The likely result', x: 50, y: 50 }
    ]
  },
  {
    id: 'deep_space_anomaly',
    name: 'Celtic Cross',
    lore_name: 'The Deep Space Anomaly',
    description: 'The traditional ten-card Celtic Cross spread',
    positions: [
      { id: 'present', name: 'Present Situation', description: 'Your current situation', x: 35, y: 50 },
      { id: 'cross', name: 'Cross/Challenge', description: 'What crosses you or challenges you', x: 50, y: 50 },
      { id: 'distant_past', name: 'Distant Past', description: 'Distant past or foundation', x: 35, y: 80 },
      { id: 'recent_past', name: 'Recent Past', description: 'Recent past', x: 20, y: 50 },
      { id: 'possible_outcome', name: 'Possible Outcome', description: 'Possible outcome', x: 35, y: 20 },
      { id: 'near_future', name: 'Near Future', description: 'Near future', x: 50, y: 50 },
      { id: 'your_approach', name: 'Your Approach', description: 'Your approach', x: 80, y: 80 },
      { id: 'external_influences', name: 'External Influences', description: 'External influences', x: 80, y: 65 },
      { id: 'hopes_fears', name: 'Hopes and Fears', description: 'Your hopes and fears', x: 80, y: 50 },
      { id: 'final_outcome', name: 'Final Outcome', description: 'Final outcome', x: 80, y: 35 }
    ]
  }
];
