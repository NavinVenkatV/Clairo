"when user upload the pdf - we are chunking it and vectorizing it and storing it in chroma db" ✅ Correct


"when user asks question we are chunking the question and vector to llm" ❌ Not quite — the question is embedded as one whole piece (not chunked), compared against the stored chunk vectors to retrieve the 5 most relevant ones, and then those chunks (as text) + the question (as text) are sent to the LLM to generate the answer.

rm -rf chroma_db