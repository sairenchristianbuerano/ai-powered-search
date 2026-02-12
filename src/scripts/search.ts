import * as readline from "readline";
import { search } from "../lib/vectorstore";
import { askClaude } from "../lib/claude";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (prompt: string): Promise<string> =>
    new Promise((resolve) => rl.question(prompt, resolve));

  console.log("\n=== AI-Powered Search ===");
  console.log('Type your question and press Enter. Type "exit" to quit.\n');

  while (true) {
    const question = await ask("Question: ");

    if (question.toLowerCase() === "exit" || question.toLowerCase() === "quit") {
      console.log("Goodbye!\n");
      break;
    }

    if (!question.trim()) continue;

    console.log("\nSearching...");
    const results = await search(question, 5);

    if (results.length === 0) {
      console.log("No relevant documents found.\n");
      continue;
    }

    console.log(`Found ${results.length} relevant chunks. Asking Claude...\n`);

    const answer = await askClaude(
      question,
      results.map((r) => ({ ...r.chunk, score: r.score }))
    );

    console.log("--- Answer ---");
    console.log(answer);
    console.log("\n--- Sources ---");
    for (const r of results.slice(0, 3)) {
      console.log(`  - ${r.chunk.sourceFile} | ${r.chunk.heading} (score: ${r.score.toFixed(3)})`);
    }
    console.log("");
  }

  rl.close();
}

main().catch(console.error);
