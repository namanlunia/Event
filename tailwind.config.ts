import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          DEFAULT: "#0B0B0D",
          1: "#111114",
          2: "#17171B",
          3: "#202026",
          glass: "rgba(17, 17, 20, 0.75)",
        },
        red: {
          primary: "#E11D2E",
          bright: "#FF3B4A",
          deep: "#8B0A1A",
          crimson: "#570611",
          glow: "rgba(225, 29, 46, 0.4)",
          subtle: "rgba(225, 29, 46, 0.12)",
        },
        text: {
          primary: "#F5F5F7",
          secondary: "#A1A1AA",
          muted: "#71717A",
          dim: "#3F3F46",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(225, 29, 46, 0.5)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "red-glow": "0 0 25px -5px rgba(225, 29, 46, 0.4)",
        "red-glow-lg": "0 0 50px -10px rgba(225, 29, 46, 0.5)",
        "red-glow-sm": "0 0 15px -3px rgba(225, 29, 46, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-red": "radial-gradient(circle at 50% 30%, rgba(225, 29, 46, 0.18) 0%, rgba(5, 5, 5, 0) 70%)",
        "red-subtle-glow": "radial-gradient(circle at 50% 50%, rgba(225, 29, 46, 0.12) 0%, transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 10px rgba(225,29,46,0.3))" },
          "100%": { filter: "drop-shadow(0 0 25px rgba(255,59,74,0.6))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
