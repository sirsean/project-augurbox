export function greet(name: string): string {
  return `Hello, ${name}!`;
}

function main(): void {
  const message = greet('TypeScript');
  console.log(message);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
