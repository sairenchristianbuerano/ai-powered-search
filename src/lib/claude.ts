import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const MAX_TOKENS = parseInt(process.env.CLAUDE_MAX_TOKENS || "2048", 10);

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
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: "user",
        content: `You are an AI documentation assistant for a custom component library.

Answer the question using ONLY the provided documentation context.

Response format:
- For each relevant component, write ONE short sentence describing what it does in plain language.
- Use the format: "component-name.md — short description"
- Keep each description under 20 words.
- Do NOT include code examples, input/output details, or technical specs.
- If no components match, say "No matching components found."

Context:
${context}

Question: ${question}`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
