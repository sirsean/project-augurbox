#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';
import cards from '../data/cards.js';

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

interface ImageGenerationRequest {
  prompt: string;
  steps: number;
}

interface ImageGenerationResponse {
  result: {
    image: string; // base64 encoded image
  };
  success: boolean;
  errors?: Array<{ message: string }>;
}

async function generateImage(prompt: string): Promise<string> {
  const payload: ImageGenerationRequest = {
    prompt: prompt,
    steps: 8  // Maximum steps for highest quality
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${AI_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
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

  const data: ImageGenerationResponse = await response.json();
  
  if (!data.success) {
    throw new Error(`API error: ${data.errors?.map(e => e.message).join(', ') || 'Unknown error'}`);
  }

  return data.result.image;
}

async function processImagesBatch(promptFiles: Array<{ filename: string; prompt: string; code: string }>): Promise<Array<{ file: string, result: string | Error }>> {
  const promises = promptFiles.map(async (file) => {
    try {
      const base64Image = await generateImage(file.prompt);
      return { file: file.filename, result: base64Image };
    } catch (error) {
      return { file: file.filename, result: error as Error };
    }
  });

  const results = await Promise.allSettled(promises);
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { file: promptFiles[index].filename, result: result.reason };
    }
  });
}

async function main() {
  const cardName = process.argv[2];
  
  // Show help if requested
  if (cardName === '--help' || cardName === '-h') {
    console.log('Usage: npm run generate:images [card-name]');
    console.log('');
    console.log('Examples:');
    console.log('  npm run generate:images                    # Generate all cards');
    console.log('  npm run generate:images "The Fool"        # Generate specific card');
    console.log('  npm run generate:images "Ace of Wands"    # Generate specific card');
    console.log('  npm run generate:images "Queen of Cups"   # Generate specific card');
    console.log('');
    console.log('Card names are case-insensitive and must match exactly.');
    console.log('Note: Images are always regenerated (existing files will be overwritten).');
    process.exit(0);
  }
  
  const promptsDir = join(process.cwd(), 'generated', 'prompts');
  const imagesDir = join(process.cwd(), 'generated', 'images');
  
  // Check if prompts directory exists
  if (!existsSync(promptsDir)) {
    console.error(`❌ Prompts directory not found: ${promptsDir}`);
    console.error('   Please run "npm run generate:prompts" first to create prompt files.');
    process.exit(1);
  }

  // Ensure the output directory exists
  try {
    mkdirSync(imagesDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }

  // Get selected cards based on card name parameter
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

// Filter prompt files based on selected cards
  const selectedCodes = new Set(selectedCards.map(card => card.code));
  const promptFiles = readdirSync(promptsDir)
    .filter(filename => extname(filename) === '.txt')
    .map(filename => {
      const filepath = join(promptsDir, filename);
      let prompt = readFileSync(filepath, 'utf8').trim();
      const code = basename(filename, '.txt');
      
      // Ensure prompt doesn't exceed Cloudflare AI's 2048 character limit
      const MAX_PROMPT_LENGTH = 2048;
      if (prompt.length > MAX_PROMPT_LENGTH) {
        console.log(`⚠️  Truncating prompt for ${filename} (${prompt.length} -> ${MAX_PROMPT_LENGTH} chars)`);
        prompt = prompt.substring(0, MAX_PROMPT_LENGTH);
      }

      return { filename, prompt, code };
    })
    .filter(file => selectedCodes.has(file.code));

  if (promptFiles.length === 0) {
    if (cardName) {
      console.error(`❌ No prompt file found for "${cardName}".`);
      console.error('   Please run "npm run generate:prompts" first to create prompt files.');
    } else {
      console.log('ℹ️  No prompt files found to process.');
      console.log('   Please run "npm run generate:prompts" first to create prompt files.');
    }
    process.exit(1);
  }

  console.log(`Starting image generation for ${promptFiles.length} prompt(s)...`);
  console.log('🎨 Using Flux-1-Schnell with 8 diffusion steps for maximum quality');
  console.log('🔄 Always regenerating images (existing files will be overwritten)');
  console.log('');

  // Process images in batches of 3 to respect rate limits (image generation is slower)
  const BATCH_SIZE = 3;
  let processed = 0;
  let failed = 0;

  for (let i = 0; i < promptFiles.length; i += BATCH_SIZE) {
    const batch = promptFiles.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(promptFiles.length / BATCH_SIZE)} (files ${i + 1}-${Math.min(i + BATCH_SIZE, promptFiles.length)})`);
    
    try {
      const results = await processImagesBatch(batch);
      
      for (const { file, result } of results) {
        if (result instanceof Error) {
          console.error(`❌ Failed to process ${file}: ${result.message}`);
          failed++;
        } else {
          // Convert base64 to binary and save as PNG
          const imageBuffer = Buffer.from(result, 'base64');
          const code = basename(file, '.txt');
          const imageFilename = join(imagesDir, `${code}.png`);
          writeFileSync(imageFilename, imageBuffer);
          console.log(`✅ Generated image for ${file} -> ${code}.png`);
          processed++;
        }
      }
      
      // Longer pause between batches for image generation to be respectful of rate limits
      if (i + BATCH_SIZE < promptFiles.length) {
        console.log('Waiting 5 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Batch processing failed:`, error);
      failed += batch.length;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`✅ Successfully processed: ${processed} images`);
  console.log(`❌ Failed: ${failed} images`);
  console.log(`📁 Images saved to: ${imagesDir}`);

  if (failed > 0) {
    console.error(`\n⚠️  ${failed} images failed processing. Check the errors above.`);
    process.exit(1);
  } else {
    console.log('\n🎉 All images processed successfully!');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
