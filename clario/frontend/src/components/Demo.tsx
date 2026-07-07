"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import axios from "axios";
import LoginModal from "./LoginModal";

const INDEXING_STAGES = [
  "Reading PDF",
  "Splitting into chunks",
  "Generating embeddings",
  "Storing in ChromaDB",
];

const API = "http://localhost:8000"; // your FastAPI backend

interface Message {
  role: "user" | "ai";
  content: string;
  sources?: { page: number | string; content: string }[];
  scores?: { faithfulness: number; answer_relevancy: number; context_precision: number };
}

interface UploadedFile {
  name: string;
  size: string;
  chunks: number;
}

export default function Demo() {
  const { data: session }             = useSession();
  console.log("veru Impolortatnt : ", session?.user)
  const [showLogin, setShowLogin]     = useState(false);
  const [file, setFile]               = useState<UploadedFile | null>(null);
  const [uploading, setUploading]     = useState(false);
  const [stageIndex, setStageIndex]   = useState(0);
  const [messages, setMessages]       = useState<Message[]>([]);
  const [question, setQuestion]       = useState("");
  const [loading, setLoading]         = useState(false);
  const [thinkStage, setThinkStage]   = useState(0);
  const [error, setError]             = useState<string | null>(null);
  const inputRef                      = useRef<HTMLInputElement>(null);
  const fileInputRef                  = useRef<HTMLInputElement>(null);

  // cycle through indexing stages purely for visual feedback while
  // the real /upload request is in flight
  useEffect(() => {
    if (!uploading) return;
    setStageIndex(0);
    const id = setInterval(() => {
      setStageIndex(prev => (prev < INDEXING_STAGES.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(id);
  }, [uploading]);

  // ── handle PDF upload ──
  const handleUpload = async (f: File) => {
    console.log("xiovioiejvoieoinonxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxS")
    console.log("Uploading:", f.name, new Date().toISOString());
    if (!f || f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", f);
    try {
      const res = await axios.post(`${API}/upload`, form);
      setFile({
        name: f.name,
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        chunks: res.data.chunks,
      });
      setMessages([]);
    } catch {
      setError("Upload failed. Make sure the backend is running.");
    } finally {
      setUploading(false);
    }
  };

  // ── drag and drop ──
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleUpload(f);
  };

  const THINK_STAGES = ["Searching document", "Reading top matches", "Composing answer"];

  useEffect(() => {
    if (!loading) return;
    setThinkStage(0);
    const id = setInterval(() => {
      setThinkStage(prev => (prev < THINK_STAGES.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // ── send question ──
  const sendQuestion = async () => {
    if (!question.trim() || !file || loading) return;
    const q = question.trim();
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", content: q }]);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API}/query`, { question: q });
      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          content: res.data.answer,
          sources: res.data.sources,
          scores: res.data.scores,
        },
      ]);
    } catch {
      setError("Query failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendQuestion();
  };
if (!session) {
      return (
        <section id="demo" className="py-28 px-12 max-w-[1100px] mx-auto">
          <p className="text-[11px] font-mono tracking-widest text-muted mb-4 uppercase">// live demo</p>
          <h2 className="font-display font-bold text-white tracking-tighter mb-4" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}>Ask your document anything</h2>
          <p className="text-[16px] text-muted max-w-md leading-relaxed mb-16">Upload a PDF and watch Clairo extract precise answers — sign in to get started.</p>
          <div className="bg-surface border border-border rounded-2xl p-16 flex flex-col items-center justify-center gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl border border-border2 bg-card flex items-center justify-center text-3xl">✦</div>
            <div><h3 className="font-display font-bold text-white text-xl mb-2">Sign in to try Clairo</h3><p className="text-muted text-[14px]">Upload documents and query them with AI — free.</p></div>
            <button onClick={() => setShowLogin(true)} className="px-8 py-3.5 bg-white text-black font-semibold text-[14px] rounded-xl hover:opacity-85 transition-opacity font-display">Sign in to continue</button>
          </div>
          <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </section>
      );
    }
  return (
    
    <section id="demo" className="py-28 px-12 max-w-[1100px] mx-auto">
      {/* header */}
      <p className="text-[11px] font-mono tracking-widest text-muted mb-4 uppercase">// live demo</p>
      <h2 className="font-display font-bold text-white tracking-tighter mb-4"
        style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}>
        Ask your document anything
      </h2>
      <p className="text-[16px] text-muted max-w-md leading-relaxed mb-16">
        Upload a PDF and watch Clairo extract precise, citation-grounded answers in real time.
      </p>

      {/* demo UI */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">

        {/* titlebar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-dim" />
          <div className="w-2.5 h-2.5 rounded-full bg-dim" />
          <div className="w-2.5 h-2.5 rounded-full bg-dim" />
          <span className="ml-2 text-[12px] font-mono text-dim">
            clairo — {file ? file.name : "no document loaded"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

          {/* LEFT — upload */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-border flex flex-col gap-5">

            {/* uploaded file */}
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg"
              >
                <span className="text-xl">📄</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-off truncate">{file.name}</div>
                  <div className="text-[11px] font-mono text-muted mt-0.5">
                    {file.size} · {file.chunks.toLocaleString()} chunks indexed
                  </div>
                </div>
                <span className="text-[11px] font-mono text-white bg-dim px-2 py-1 rounded shrink-0">
                  indexed
                </span>
              </motion.div>
            )}

            {/* drop zone */}
            <div
              className="flex-1 border border-dashed border-border2 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-muted hover:bg-white/[0.01] transition-all duration-200"
              onDrop={onDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-[260px]">
                  <div className="w-6 h-6 border-2 border-muted border-t-white rounded-full animate-spin" />
                  <div className="flex flex-col gap-2 w-full">
                    {INDEXING_STAGES.map((stage, i) => (
                      <div key={stage} className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                            i < stageIndex ? "bg-white" : i === stageIndex ? "bg-white animate-pulse" : "bg-dim"
                          }`}
                        />
                        <span
                          className={`text-[12px] font-mono transition-colors duration-300 ${
                            i <= stageIndex ? "text-off" : "text-dim"
                          }`}
                        >
                          {stage}
                          {i === stageIndex && <span className="animate-pulse">...</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-3xl opacity-40">⊕</span>
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-off mb-1">
                      {file ? "Upload another document" : "Drop your PDF here"}
                    </p>
                    <p className="text-[12px] text-muted">PDF · Up to 1,000 pages</p>
                  </div>
                </>
              )}
            </div>

            {/* mini metrics */}
            <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-border">
              <p className="text-[10px] font-mono text-dim tracking-widest uppercase mb-1">Pipeline</p>
              {[
                ["Embedding model",  "text-embedding-3-small"],
                ["LLM",             "GPT-4o-mini"],
                ["Vector DB",       "ChromaDB"],
                ["Reranker",        "Cohere cross-encoder"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-[12px] font-mono">
                  <span className="text-muted">{label}</span>
                  <span className="text-off">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — chat */}
          <div className="p-8 flex flex-col gap-4">

            {/* messages */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-80">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <span className="text-4xl opacity-20">✦</span>
                  <p className="text-[13px] text-muted">
                    {file ? "Ask anything about your document" : "Upload a document to get started"}
                  </p>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-dim uppercase">
                      {msg.role === "user" ? "You" : "Clairo"}
                    </span>

                    {msg.role === "user" ? (
                      <div className="self-end bg-card border border-border text-off text-[14px] leading-relaxed px-4 py-3 rounded-xl max-w-[90%]">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="border border-border2 text-off text-[14px] leading-relaxed px-4 py-3 rounded-xl">
                        {msg.content}

                        {/* citations */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.sources.slice(0, 3).map((s, j) => (
                              <span key={j} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted bg-card border border-border px-2 py-1 rounded">
                                📄 Page {s.page}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* scores */}
                        {msg.scores && (
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            {[
                              ["FAITH", msg.scores.faithfulness],
                              ["RELEV", msg.scores.answer_relevancy],
                              ["PREC",  msg.scores.context_precision],
                            ].map(([label, val]) => (
                              <div key={label as string} className="bg-card border border-border rounded-md p-2">
                                <div className="text-[9px] font-mono text-dim tracking-widest mb-1">{label}</div>
                                <div className="text-[15px] font-mono font-semibold text-white">
                                  {Number(val).toFixed(2)}
                                </div>
                                <div className="h-0.5 bg-border rounded mt-1.5 overflow-hidden">
                                  <div
                                    className="h-full bg-white rounded score-bar"
                                    style={{ width: `${Number(val) * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* loading */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-dim uppercase tracking-widest">Clairo</span>
                  <div className="flex gap-1 ml-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1 h-1 rounded-full bg-muted animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={THINK_STAGES[thinkStage]}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] font-mono text-dim ml-1"
                    >
                      {THINK_STAGES[thinkStage]}...
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {error && (
              <p className="text-[12px] font-mono text-red-500/70">{error}</p>
            )}

            {/* input */}
            <div className="flex gap-2 mt-auto pt-4 border-t border-border">
              <input
                ref={inputRef}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={!file || loading}
                placeholder={file ? "Ask anything about your document..." : "Upload a document first..."}
                className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-[13px] font-display text-off placeholder:text-dim outline-none focus:border-muted transition-colors disabled:opacity-40"
              />
              <button
                onClick={sendQuestion}
                disabled={!file || loading || !question.trim()}
                className="px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-lg hover:opacity-85 transition-opacity disabled:opacity-30 font-display"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
