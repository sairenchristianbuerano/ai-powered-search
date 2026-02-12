# PDF Loader Component

Extracts text content from PDF files for processing in document pipelines. Supports multi-page PDFs, OCR for scanned documents, and table extraction.

## Overview

The PDF Loader reads PDF files and extracts their text content page by page. It handles both digitally-created PDFs (with selectable text) and scanned PDFs (using optional OCR). Output can be structured as pages, full text, or individual elements.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file_path` | `file` | Yes | Path to the PDF file |
| `pages` | `string` | No | Page range to extract (e.g., `"1-5"`, `"1,3,7"`, default: all) |
| `extract_tables` | `bool` | No | Attempt to extract tables as structured data (default: `false`) |
| `ocr_enabled` | `bool` | No | Use OCR for scanned documents (default: `false`) |
| `ocr_language` | `string` | No | OCR language code (default: `"eng"`) |
| `output_format` | `dropdown` | No | Output structure: `full_text`, `per_page`, `elements` (default: `full_text`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `text` | `string` | Full extracted text content |
| `pages` | `list[dict]` | Per-page content with page numbers |
| `tables` | `list[dict]` | Extracted tables as structured data |
| `page_count` | `int` | Total number of pages in the PDF |
| `metadata` | `dict` | PDF metadata (author, title, creation date) |

## Usage Example

```python
from custom_components import PDFLoaderComponent

loader = PDFLoaderComponent()
result = loader.run(
    file_path="reports/annual-report.pdf",
    pages="1-10",
    extract_tables=True
)
print(f"Extracted {result.page_count} pages, {len(result.tables)} tables")
```

## OCR Support

When `ocr_enabled` is set to `true`, the component uses Tesseract OCR to extract text from scanned pages. This requires the Tesseract binary to be installed on the system.

## Common Use Cases

- Ingesting PDF documentation for knowledge base creation
- Extracting financial data from PDF reports
- Processing research papers for summarization pipelines
- Converting PDF manuals into searchable text
