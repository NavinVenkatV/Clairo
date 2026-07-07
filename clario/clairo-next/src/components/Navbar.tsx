"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-black/90 backdrop-blur-md" : ""
      }`}
    >
      {/* Logo */}
      <div className="font-display text-[18px] font-bold tracking-tight text-white">
        Clairo<span className="text-muted font-light">.</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        {["Demo", "How it works", "Compare"].map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] text-muted hover:text-white transition-colors duration-200 tracking-widest font-mono uppercase"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#demo"
        className="text-[13px] font-medium px-5 py-2 border border-border2 rounded-md text-white hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
      >
        Try Clairo
      </a>
    </motion.nav>
  );
}
