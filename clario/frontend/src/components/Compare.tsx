"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  { feature: "Pricing",              harvey: "$50,000 / yr",    glean: "$20,000 / yr",    clairo: "Free · Open source" },
  { feature: "Data privacy",         harvey: "Their servers",   glean: "Their servers",   clairo: "Fully local (Phase 2)" },
  { feature: "Open source",          harvey: "✕",               glean: "✕",               clairo: "✓" },
  { feature: "Citation enforcement", harvey: "✓",               glean: "✕",               clairo: "✓" },
  { feature: "Evaluation pipeline",  harvey: "Unknown",         glean: "Unknown",         clairo: "Ragas · CI-gated" },
  { feature: "Self-hostable",        harvey: "✕",               glean: "✕",               clairo: "✓" },
];

export default function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="compare" ref={ref} className="py-28 px-12 max-w-[900px] mx-auto">
      <p className="text-[11px] font-mono tracking-widest text-muted mb-4 uppercase">// comparison</p>
      <h2 className="font-display font-bold text-white tracking-tighter mb-4"
        style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}>
        Why not Harvey AI?
      </h2>
      <p className="text-[16px] text-muted max-w-sm leading-relaxed mb-16">
        Same technology. None of the drawbacks.
      </p>

      <motion.table
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full border-collapse"
      >
        <thead>
          <tr>
            {["Feature", "Harvey AI", "Glean", "Clairo"].map((h, i) => (
              <th key={h} className={`px-6 py-4 text-left text-[12px] font-mono tracking-widest border-b border-border font-normal ${i === 3 ? "text-white font-medium" : "text-muted"}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              className="group hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-6 py-4 text-[14px] text-off border-b border-border">{row.feature}</td>
              <td className="px-6 py-4 text-[14px] text-muted border-b border-border">{row.harvey}</td>
              <td className="px-6 py-4 text-[14px] text-muted border-b border-border">{row.glean}</td>
              <td className="px-6 py-4 text-[14px] text-white border-b border-border font-medium">{row.clairo}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </section>
  );
}
