#!/usr/bin/env tsx

/**
 * Example utility script showing how to use tsx for running TypeScript utilities
 * without compilation.
 *
 * Usage: npx tsx scripts/example-utility.ts [name]
 * Or make it executable: chmod +x scripts/example-utility.ts && ./scripts/example-utility.ts [name]
 */

import { greet } from '../src/index.js';

function main(): void {
  const name = process.argv[2] || 'World';
  const message = greet(name);
  console.log(`Utility script says: ${message}`);

  // Example of some utility work
  const currentTime = new Date().toISOString();
  console.log(`Current time: ${currentTime}`);
}

main();
