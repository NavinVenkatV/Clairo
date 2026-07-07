"use client";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-12 pt-28 pb-20 overflow-hidden">

      {/* grid bg */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      {/* badge */}
      <motion.div {...fadeUp(0.2)} className="relative z-10 inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-muted border border-border rounded-full px-4 py-1.5 mb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Document Intelligence Platform
      </motion.div>

      {/* title */}
      <motion.h1
        {...fadeUp(0.4)}
        className="relative z-10 font-display font-bold leading-none tracking-tightest text-white mb-6"
        style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
      >
        Your documents.<br />
        <span className="text-muted font-light">Finally answerable.</span>
      </motion.h1>

      {/* subtitle */}
      <motion.p
        {...fadeUp(0.6)}
        className="relative z-10 text-[18px] text-muted max-w-lg leading-relaxed mb-12"
      >
        Upload any document. Ask anything. Get precise answers with exact page citations — in seconds. No manual reading. No hallucinations.
      </motion.p>

      {/* actions */}
      <motion.div {...fadeUp(0.8)} className="relative z-10 flex gap-4 items-center">
        <a
          href="#demo"
          className="px-7 py-3.5 bg-white text-black font-semibold text-[14px] rounded-lg hover:opacity-85 transition-all duration-200 hover:-translate-y-0.5"
        >
          Upload a document
        </a>
        <a
          href="#how-it-works"
          className="px-7 py-3.5 border border-border text-muted text-[14px] rounded-lg hover:text-white hover:border-dim transition-all duration-200"
        >
          See how it works
        </a>
      </motion.div>
    </section>
  );
}
