import os
from dotenv import load_dotenv

import chromadb

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_classic.chains import RetrievalQA

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_DIR = os.path.join(BASE_DIR, "chroma_db")

COLLECTION_NAME = "documents"

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small"
)


def load_pdf(file_path: str):
    loader = PyMuPDFLoader(file_path)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )

    return splitter.split_documents(documents)


def index_document(chunks):
    """
    Replace the previous uploaded document completely.
    """

    client = chromadb.PersistentClient(path=CHROMA_DIR)

    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass

    vectorstore = Chroma(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
    )

    vectorstore.add_documents(chunks)

    return vectorstore


def query_document(question: str):
    client = chromadb.PersistentClient(path=CHROMA_DIR)

    vectorstore = Chroma(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
    )

    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": 5
        }
    )

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
    )

    chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
    )

    result = chain.invoke(
        {
            "query": question
        }
    )

    answer = result["result"]

    sources = []

    for doc in result["source_documents"]:
        sources.append(
            {
                "page": doc.metadata.get("page", "unknown"),
                "content": doc.page_content[:200],
            }
        )

    return {
        "answer": answer,
        "sources": sources,
    }