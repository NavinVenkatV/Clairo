import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black:   "#020202",
        surface: "#0D0D0D",
        card:    "#111111",
        border:  "#222222",
        border2: "#2E2E2E",
        dim:     "#333333",
        muted:   "#666666",
        off:     "#E8E8E8",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.03em",
        tight:    "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
