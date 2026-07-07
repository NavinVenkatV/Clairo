"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { icon: "📄", title: "Upload",   desc: "PDF parsed and split into overlapping 400-word chunks with metadata" },
  { icon: "⚡", title: "Embed",    desc: "Each chunk converted to a 1,536-dim vector via OpenAI Embeddings" },
  { icon: "🔍", title: "Retrieve", desc: "Hybrid BM25 + vector search finds top 10 candidate chunks" },
  { icon: "🎯", title: "Rerank",   desc: "Cohere cross-encoder reorders chunks by true relevance to query" },
  { icon: "✦",  title: "Answer",   desc: "GPT-4o-mini answers from top 5 chunks with page-level citations" },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-20 px-12 max-w-[1100px] mx-auto border-t border-border">
      <p className="text-[11px] font-mono tracking-widest text-muted mb-4 uppercase">// architecture</p>
      <h2 className="font-display font-bold text-white tracking-tighter mb-4"
        style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}>
        How Clairo works
      </h2>
      <p className="text-[16px] text-muted max-w-md leading-relaxed mb-16">
        A production-grade RAG pipeline. Hybrid retrieval. Cross-encoder reranking. Zero hallucination.
      </p>

      {/* steps */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* connector line */}
        <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border2 to-transparent" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-4 group"
          >
            <div className="relative z-10 w-14 h-14 rounded-full border border-border2 bg-surface flex items-center justify-center text-xl group-hover:border-muted group-hover:bg-card transition-all duration-300">
              {step.icon}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-off mb-1">{step.title}</p>
              <p className="text-[12px] text-muted leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
