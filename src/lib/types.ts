export interface DocumentChunk {
  id: string;
  text: string;
  sourceFile: string;
  heading: string;
}

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}
