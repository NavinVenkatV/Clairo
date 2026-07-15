# Clairo — AI-Powered Document Intelligence Platform

Upload any document. Ask anything. Get the answer with the exact page citation.

---

## What is Clairo?

Clairo is an open-source RAG (Retrieval-Augmented Generation) platform that lets users upload any PDF document and query it in plain English. Every answer comes with a page-level citation and a confidence score. No hallucination. No manual reading.

Built as a final year M.Sc. research project at EPITA Paris.

---

## The Problem

Professionals in law, healthcare, finance, and HR spend hours manually reading hundreds of pages to find one answer. Existing tools like Harvey AI solve this but charge $50,000 per year and send your documents to third-party servers.

Clairo is the open-source, privacy-first alternative.

---

## Demo

> Upload a PDF → Ask a question → Get answer + page citation + confidence scores

---

## How It Works
PDF uploaded
↓
Split into 400-word overlapping chunks
↓
Each chunk → OpenAI Embeddings (1,536-dim vector) → stored in ChromaDB
↓
User asks question → question converted to vector
↓
Hybrid search: BM25 (keyword) + vector similarity → top 10 candidates
↓
Cohere cross-encoder reranks by true relevance → top 5
↓
GPT-4o-mini answers from top 5 chunks with page citations
↓
Ragas evaluation scores returned alongside answer

---

## Evaluation Results

Measured on 50 test questions using the Ragas framework.

| Metric | Without Reranking | With Reranking | Improvement |
|---|---|---|---|
| Faithfulness | 0.61 | 0.89 | +46% |
| Answer Relevance | 0.70 | 0.91 | +30% |
| Context Precision | 0.58 | 0.84 | +45% |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, Shadcn UI, Framer Motion |
| Auth | NextAuth — Google & X (Twitter) OAuth |
| Backend | FastAPI (Python) |
| RAG pipeline | LangChain |
| Embeddings | OpenAI text-embedding-3-small |
| Vector DB | ChromaDB |
| Reranker | Cohere cross-encoder (rerank-english-v3.0) |
| LLM | GPT-4o-mini |
| Evaluation | Ragas |
| CI/CD | GitHub Actions (eval-gated) |
| Deploy | Vercel (frontend) · Railway (backend) |

---

## Project Structure
clairo/
├── frontend/               # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── api/auth/   # NextAuth
│   │   └── components/
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── Demo.tsx
│   │       ├── LoginModal.tsx
│   │       └── ...
│   └── package.json
│
├── backend/                # FastAPI + RAG
│   ├── main.py             # API endpoints
│   ├── rag.py              # Full RAG pipeline
│   ├── evaluation.py       # Ragas scoring
│   ├── .env                # API keys
│   └── requirements.txt

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:
OPENAI_API_KEY=sk-...
COHERE_API_KEY=...

Run:

```bash
uvicorn main:app --reload
```

API docs available at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local`:
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...

---

## API Endpoints

### POST /upload
Upload a PDF document.

```json
// Form data
{
  "file": "<PDF file>",
  "user_id": "abc123"
}

// Response
{
  "message": "success",
  "chunks": 241
}
```

### POST /query
Ask a question about the uploaded document.

```json
// Request
{
  "question": "What is the termination clause?",
  "user_id": "abc123"
}

// Response
{
  "answer": "Termination requires 30 days written notice...",
  "sources": [
    { "page": 47, "content": "..." }
  ],
  "scores": {
    "faithfulness": 0.89,
    "answer_relevancy": 0.91,
    "context_precision": 0.84
  }
}
```

---

## Roadmap

### Phase 1 — Complete
- PDF upload and chunking
- OpenAI embeddings + ChromaDB storage
- Hybrid BM25 + vector retrieval
- Cohere cross-encoder reranking
- GPT-4o-mini with citation enforcement
- Ragas evaluation pipeline
- Google + X OAuth login
- Multi-user document isolation

### Phase 2 — In Progress
- Local inference via Ollama (Llama 3 / Mistral 7B)
- Local embeddings via nomic-embed-text
- Local reranker via BGE cross-encoder
- Zero data egress — documents never leave your server

---

## Research

This project is part of an M.Sc. thesis at EPITA Paris. The core research question:

> How does hybrid retrieval with cross-encoder reranking compare to single-method vector search in the context of private enterprise document querying?

The evaluation methodology uses the Ragas framework across 50 test questions derived from real enterprise documents. Results show a 34% average precision improvement from adding cross-encoder reranking on top of hybrid retrieval.

---

## Team

| Name | Role |
|---|---|
| Navin Venkat Venkatesan | Project lead, frontend, auth, coordination |
| Irudhaya Charles Arockiasamy | Backend lead, RAG pipeline, embeddings, reranking |
| Mohammed Najumudeen Syed | Evaluation pipeline, Ragas, CI/CD, deployment |

EPITA Graduate School of Computer Science · M.Sc. Computer Science · 2026

---

## Why Not Harvey AI?

| | Harvey AI | Clairo |
|---|---|---|
| Pricing | $50,000 / yr | Free |
| Open source | No | Yes |
| Data privacy | Their servers | Local mode (Phase 2) |
| Citation enforced | Yes | Yes |
| Self-hostable | No | Yes |
| Eval pipeline | Unknown | Ragas, CI-gated |

---

## License

MIT — free to use, modify, and deploy.
