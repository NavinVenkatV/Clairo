import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyMuPDFLoader # -> reads the pdf
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings #used for converting chunks to vector
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

load_dotenv()

# on main.py file we got a pdf passed to rag (query_document)

#load and chunking the pdf - 
def load_pdf(filePath : str):
    loader  = PyMuPDFLoader(filePath)
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = 500,
        chunk_overlap = 50
    )
    chunks = splitter.split_documents(documents)
    return chunks;

#we have chunks -- we need to store it in chromaDB

def index_document(chunks):
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small"
    )
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"  # saves locally
    )
    return vectorstore

def query_document(question : str):
    embeddings = OpenAIEmbeddings(
        model = "text-embedding-3-small"
    )
    vectorstore = Chroma(
    persist_directory = "./chroma_db",
    embedding_function = embeddings 
    )
    retriever = vectorstore.as_retriever(
        search_kwargs = { "k" : 5}
    )

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0  # no creativity, factual only
    )

    chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True  # gives citations
    )
    result = chain.invoke({"query": question})
    
    answer = result["result"]
    sources = []
    for doc in result["source_documents"]:
        sources.append({
            "page": doc.metadata.get("page", "unknown"),
            "content": doc.page_content[:200]  # first 200 chars
        })
    
    return {"answer": answer, "sources": sources}

if __name__ == "__main__":
    # test upload
    chunks = load_pdf("test.pdf")
    print(f"Total chunks: {len(chunks)}")
    index_document(chunks)
    print("Indexed!")
    
    # test query
    result = query_document("what is this document about?")
    print(result["answer"])
    print(result["sources"])