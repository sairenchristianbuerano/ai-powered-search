import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function askClaude(
  question: string,
  contextChunks: { text: string; sourceFile: string; heading: string; score: number }[]
): Promise<string> {
  const context = contextChunks
    .map(
      (c) =>
        `--- Source: ${c.sourceFile} | ${c.heading} (relevance: ${c.score.toFixed(2)}) ---\n${c.text}`
    )
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Answer the following question based ONLY on the provided documentation context. If the context does not contain enough information to answer, say so. Cite which source file(s) your answer comes from.

Context:
${context}

Question: ${question}`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
