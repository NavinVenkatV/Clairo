"use client";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Google SVG icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

// X (Twitter) SVG icon
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl: "/" });
    setLoadingProvider(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm bg-surface border border-border rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="font-display font-bold text-white text-[16px] tracking-tight">
                  Clairo<span className="text-muted font-light">.</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted hover:text-white transition-colors text-[20px] leading-none"
                >
                  ×
                </button>
              </div>

              {/* body */}
              <div className="px-6 py-8 flex flex-col items-center text-center gap-6">

                {/* icon */}
                <div className="w-14 h-14 rounded-2xl border border-border2 bg-card flex items-center justify-center text-2xl">
                  ✦
                </div>

                <div>
                  <h2 className="font-display font-bold text-white text-[22px] tracking-tight mb-2">
                    Sign in to Clairo
                  </h2>
                  <p className="text-[13px] text-muted leading-relaxed max-w-[260px] mx-auto">
                    Upload documents and ask anything — your data stays private.
                  </p>
                </div>

                {/* divider */}
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] font-mono text-dim tracking-widest">CONTINUE WITH</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Google button */}
                <button
                  onClick={() => handleSignIn("google")}
                  disabled={!!loadingProvider}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white text-black text-[14px] font-semibold rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 font-display"
                >
                  {loadingProvider === "google" ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <GoogleIcon />
                  )}
                  Continue with Google
                </button>

                {/* X button */}
                <button
                  onClick={() => handleSignIn("twitter")}
                  disabled={!!loadingProvider}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-black text-white text-[14px] font-semibold rounded-xl border border-border2 hover:bg-card hover:border-muted transition-all duration-200 disabled:opacity-50 font-display"
                >
                  {loadingProvider === "twitter" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <XIcon />
                  )}
                  Continue with X
                </button>

                {/* terms */}
                <p className="text-[11px] text-dim leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-muted hover:text-off underline underline-offset-2">Terms</a>
                  {" "}and{" "}
                  <a href="#" className="text-muted hover:text-off underline underline-offset-2">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
