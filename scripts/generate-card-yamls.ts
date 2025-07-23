#!/usr/bin/env tsx

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import cards from '../data/cards.js';

// Helper function to escape YAML strings that contain special characters
function escapeYamlString(str: string): string {
  // If the string contains quotes, colons, or newlines, wrap it in quotes and escape internal quotes
  if (str.includes('"') || str.includes(':') || str.includes('\n') || str.includes("'")) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
}

function getCardType(code: string): { type: 'major' | 'minor', suit?: string } {
  if (code.startsWith('MAJ_')) {
    return { type: 'major' };
  }
  
  const suit = code.split('_')[0].toLowerCase();
  return { type: 'minor', suit };
}

function getCardNumber(code: string): number | string {
  if (code.startsWith('MAJ_')) {
    return parseInt(code.split('_')[1]);
  }
  
  const parts = code.split('_');
  const number = parts[1];
  
  if (number === 'ACE') return 1;
  if (number === 'PAGE') return 'page';
  if (number === 'KNIGHT') return 'knight';
  if (number === 'QUEEN') return 'queen';
  if (number === 'KING') return 'king';
  
  return parseInt(number);
}

async function main() {
  const outputDir = join(process.cwd(), 'apps', 'augurbox-web', 'data', 'cards');
  
  // Ensure the output directory exists
  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }

  console.log(`Generating YAML files for ${cards.length} cards...`);
  console.log(`Output directory: ${outputDir}`);

  for (const card of cards) {
    const { type, suit } = getCardType(card.code);
    const number = getCardNumber(card.code);
    
    const yamlContent = `# ${card.name}
id: ${card.id}
code: ${escapeYamlString(card.code)}
name: ${escapeYamlString(card.name)}
description: ${escapeYamlString(card.description)}
type: ${type}${suit ? `
suit: ${suit}` : ''}
number: ${number}
image: /cards/${card.code}.png

# Full card description/meaning
prompt: ${escapeYamlString(card.prompt)}

# Card meanings (traditional interpretations)
meanings:
  upright:
    - ${escapeYamlString(card.description)}
  reversed:
    - "Opposition to ${card.description.toLowerCase()}"

# Keywords for quick reference
keywords:
  - ${card.description.split(', ').map(k => escapeYamlString(k.trim())).join('\n  - ')}
`;

    const filename = join(outputDir, `${card.code}.yaml`);
    writeFileSync(filename, yamlContent, 'utf8');
    console.log(`✅ Created ${card.code}.yaml`);
  }

  console.log(`\n🎉 Successfully generated ${cards.length} YAML files!`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
