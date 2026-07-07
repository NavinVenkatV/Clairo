from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import load_pdf, index_document, query_document
import os
import shutil

app = FastAPI()

# ── CORS ────────────────────────────────────────────────
# Your Next.js frontend runs on a different origin (localhost:3000)
# than this backend (localhost:8000). Browsers block cross-origin
# requests by default, so we explicitly allow the frontend's origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    chunks = load_pdf(temp_path)
    index_document(chunks)  # wipes old chroma_db and re-indexes fresh
    os.remove(temp_path)

    return {
        "message": "Pdf Uploaded Successfully!",
        "chunks": len(chunks),
    }


class QueryRequest(BaseModel):
    question: str


@app.post("/query")
def query(request: QueryRequest):
    result = query_document(request.question)
    return {
        "answer": result["answer"],
        "sources": result["sources"],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)