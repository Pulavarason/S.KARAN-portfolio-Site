import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080808",
          soft: "#111111",
          line: "#232323",
        },
        bone: {
          DEFAULT: "#F5F5F0",
          soft: "#EDEDE6",
          muted: "#A8A69E",
        },
        ivory: {
          DEFAULT: "#F6F3EC",
          soft: "#EFEBE1",
          line: "#DCD6C7",
        },
        charcoal: {
          DEFAULT: "#211F1C",
          muted: "#6E6A62",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
