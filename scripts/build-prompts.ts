#!/usr/bin/env tsx

import { config } from 'dotenv';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import cards from '../data/cards.js';
import { masterPrompt } from '../data/masterPrompt.js';
// Removed style embedding imports - using direct system prompt approach

// Load environment variables
config();

const AI_ACCOUNT_ID = process.env.AI_ACCOUNT_ID;
const AI_API_TOKEN = process.env.AI_API_TOKEN;

if (!AI_ACCOUNT_ID || !AI_API_TOKEN) {
  console.error('❌ Error: Missing required environment variables');
  console.error('   Please ensure .env file exists with:');
  console.error('   AI_ACCOUNT_ID=your-account-id');
  console.error('   AI_API_TOKEN=your-api-token');
  console.error('   See .env.example for reference.');
  process.exit(1);
}

interface ChatCompletionRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  result: {
    response: string;
  };
  success: boolean;
  errors?: Array<{ message: string }>;
}

async function refinePrompt(card: typeof cards[0]): Promise<string> {
  // Use direct system prompt approach without style embedding
  const userPrompt = `${card.prompt}\n\nRefine the above into a single, vivid image generation prompt (max 512 words). Keep all lore-specific nouns. Do not mention tarot or camera brands.`;
  
  const payload: ChatCompletionRequest = {
    messages: [
      {
        role: 'system',
        content: masterPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    max_tokens: 512  // Increased from default 256 to allow complete prompts
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${AI_ACCOUNT_ID}/ai/run/@cf/meta/llama-4-scout-17b-16e-instruct`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    let errorDetails = '';
    try {
      const errorBody = await response.text();
      errorDetails = ` - Response: ${errorBody}`;
    } catch (e) {
      // If we can't read the error body, that's fine
    }
    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}${errorDetails}`);
  }

  const data: ChatCompletionResponse = await response.json();
  
  if (!data.success) {
    throw new Error(`API error: ${data.errors?.map(e => e.message).join(', ') || 'Unknown error'}`);
  }

  return data.result.response.trim();
}

async function processCardsBatch(cardsBatch: typeof cards): Promise<Array<{ card: typeof cards[0], result: string | Error }>> {
  const promises = cardsBatch.map(async (card) => {
    try {
      const refinedPrompt = await refinePrompt(card);
      return { card, result: refinedPrompt };
    } catch (error) {
      return { card, result: error as Error };
    }
  });

  const results = await Promise.allSettled(promises);
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { card: cardsBatch[index], result: result.reason };
    }
  });
}

async function main() {
  const cardName = process.argv[2];
  
  // Show help if requested
  if (cardName === '--help' || cardName === '-h') {
    console.log('Usage: npm run generate:prompts [card-name]');
    console.log('');
    console.log('Examples:');
    console.log('  npm run generate:prompts                    # Generate all cards');
    console.log('  npm run generate:prompts "The Fool"        # Generate specific card');
    console.log('  npm run generate:prompts "Ace of Wands"    # Generate specific card');
    console.log('  npm run generate:prompts "Queen of Cups"   # Generate specific card');
    console.log('');
    console.log('Card names are case-insensitive and must match exactly.');
    process.exit(0);
  }
  
  const selectedCards = cardName ? cards.filter(card => card.name.toLowerCase() === cardName.toLowerCase()) : cards;

  if (cardName && selectedCards.length === 0) {
    console.error(`❌ No card found with the name "${cardName}".`);
    console.error('   Available card names include:');
    console.error('   - Major Arcana: "The Fool", "The Magician", "The High Priestess", etc.');
    console.error('   - Wands: "Ace of Wands", "Two of Wands", "Page of Wands", "Queen of Wands", etc.');
    console.error('   - Cups: "Ace of Cups", "Two of Cups", "Page of Cups", "King of Cups", etc.');
    console.error('   - Swords: "Ace of Swords", "Two of Swords", "Page of Swords", "King of Swords", etc.');
    console.error('   - Pentacles: "Ace of Pentacles", "Two of Pentacles", "Page of Pentacles", "King of Pentacles", etc.');
    console.error('');
    console.error('   Use --help to see usage examples.');
    process.exit(1);
  }

  console.log(`Starting prompt refinement for ${selectedCards.length} card(s)...`);
  console.log('🎨 Using Fringe-inspired retro-futurist system prompt');
  console.log('📋 Direct system prompt approach - no style embedding');
  console.log('');
  
  // Ensure the output directory exists
  const outputDir = join(process.cwd(), 'generated', 'prompts');
  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }

  // Process cards in batches of 5 to respect rate limits
  const BATCH_SIZE = 5;
  let processed = 0;
  let failed = 0;

for (let i = 0; i < selectedCards.length; i += BATCH_SIZE) {
    const batch = selectedCards.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(selectedCards.length / BATCH_SIZE)} (cards ${i + 1}-${Math.min(i + BATCH_SIZE, selectedCards.length)})`);
    
    try {
      const results = await processCardsBatch(batch);
      
      for (const { card, result } of results) {
        if (result instanceof Error) {
          console.error(`❌ Failed to process ${card.name} (${card.code}): ${result.message}`);
          failed++;
        } else {
          const filename = join(outputDir, `${card.code}.txt`);
          writeFileSync(filename, result, 'utf8');
          console.log(`✅ Generated prompt for ${card.name} (${card.code})`);
          processed++;
        }
      }
      
      // Brief pause between batches to be respectful of rate limits
      if (i + BATCH_SIZE < selectedCards.length) {
        console.log('Waiting 2 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Batch processing failed:`, error);
      failed += batch.length;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`✅ Successfully processed: ${processed} cards`);
  console.log(`❌ Failed: ${failed} cards`);
  console.log(`📁 Prompts saved to: ${outputDir}`);

  if (failed > 0) {
    console.error(`\n⚠️  ${failed} cards failed processing. CI should be alerted.`);
    process.exit(1);
  } else {
    console.log('\n🎉 All cards processed successfully!');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
