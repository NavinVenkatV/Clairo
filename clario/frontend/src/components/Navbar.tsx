"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [showLogin, setShowLogin]   = useState(false);
  const { data: session }           = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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

        {/* Auth */}
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-7 h-7 rounded-full border border-border2"
              />
            )}
            <span className="text-[13px] text-muted font-mono hidden md:block">
              {session.user?.name?.split(" ")[0]}
            </span>
            <button
              onClick={() => signOut()}
              className="text-[13px] font-medium px-4 py-2 border border-border rounded-md text-muted hover:text-white hover:border-dim transition-all duration-200"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-[13px] font-medium px-5 py-2 border border-border2 rounded-md text-white hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
          >
            Sign in
          </button>
        )}
      </motion.nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
