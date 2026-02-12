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

export interface SearchResponse {
  query: string;
  answer: string;
  files: string[];
  fileCount: number;
  totalFilesSearched: number;
  searchTimeSeconds: number;
  isEmpty: boolean;
}
