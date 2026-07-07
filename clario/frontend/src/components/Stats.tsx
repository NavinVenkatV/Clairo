"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { num: "34%",   label: "Precision improvement\nwith reranking" },
  { num: "0.89",  label: "Ragas faithfulness\non test suite" },
  { num: "<800",  label: "ms p95 latency\nend-to-end" },
  { num: "$0",    label: "Data sent externally\nin local mode" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.num}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`px-12 py-14 ${i < 3 ? "border-r border-border" : ""}`}
        >
          <div className="font-mono font-bold text-white mb-2" style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.04em" }}>
            {stat.num}
          </div>
          <div className="text-[13px] text-muted leading-relaxed whitespace-pre-line">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
