import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const KNOWN_PLATFORMS = [
  "langflow",
  "flowise",
  "n8n",
  "make",
  "zapier",
  "dify",
  "langchain",
  "llamaindex",
  "haystack",
  "semantic kernel",
  "autogen",
  "crewai",
];

export function detectPlatform(query: string): string | null {
  const lower = query.toLowerCase();
  for (const platform of KNOWN_PLATFORMS) {
    if (lower.includes(platform)) {
      return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  }
  return null;
}

export async function askClaude(
  question: string,
  contextChunks: { text: string; sourceFile: string; heading: string; score: number }[]
): Promise<string> {
  const context = contextChunks
    .map(
      (c) =>
        `--- Source: ${c.sourceFile} (relevance: ${c.score.toFixed(2)}) ---\n${c.text}`
    )
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are an AI documentation assistant for a custom component library. Answer the question based ONLY on the provided documentation context.

Rules:
- Reference components by their markdown file name (e.g., "calculator-component.md")
- Be concise and direct
- If the context does not contain enough information, say so clearly

Context:
${context}

Question: ${question}`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
