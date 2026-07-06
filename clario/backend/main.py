from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from rag import load_pdf, index_document, query_document
import os



app = FastAPI();

class upload_file(BaseModel):
    pdf : str


@app.post('/upload')
def upload_pdf(file : UploadFile = File(...)):
   temp_path = f"temp_{file.filename}" # I gave a temp name for the file
   with open(temp_path, "wb") as buffer:
       shutil.copyfileobj(file.file, buffer)
    
    
   chunks = load_pdf(temp_path)
   index_document(chunks)
   os.remove(temp_path)

   return {
       "msg" : "Pdf Uploaded Succesfully!",
       "chunks" : len(chunks)
   }

class queryRequest(BaseModel) :
    query : str

   
@app.post('/query')
def query(request : queryRequest):
    result = query_document(request.question)
    return {
        "answer" : result["answer"],
        "sources" : result["sources"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

