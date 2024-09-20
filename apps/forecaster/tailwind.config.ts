import type { Config } from "tailwindcss";

const config: Config = {
  mode: "JIT",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      h1: ["80px", { lineHeight: "80px", letterSpacing: "-0.03em" }],
      "h1-t": ["64px", { lineHeight: "70.4px", letterSpacing: "-).03em" }],
      "h1-m": ["48px", { lineHeight: "52.8px", letterSpacing: "-0.03em" }],
      h2: ["60px", { lineHeight: "66px", letterSpacing: "-0.03em" }],
      "h2-t": ["48px", { lineHeight: "52.8px", letterSpacing: "-0.03em" }],
      "h2-m": ["36px", { lineHeight: "39.6px", letterSpacing: "-0.03em" }],
      menu: ["30px", { lineHeight: "36px", letterSpacing: "-0.015em" }],
      "menu-t": ["24px", { lineHeight: "28.8px", letterSpacing: "-0.015em" }],
      "menu-m": ["18px", { lineHeight: "21.6px", letterSpacing: "-0.015em" }],
      furniture: ["20px", { lineHeight: "26px" }],
      "furniture-t": ["16px", { lineHeight: "20.8px" }],
      "furniture-m": ["12px", { lineHeight: "15.6px" }],
      body: ["20px", { lineHeight: "26px" }],
      "body-t": ["16px", { lineHeight: "20.8px" }],
      "body-m": ["12px", { lineHeight: "15.6px" }],
      "small-details": ["15px", { lineHeight: "21px" }],
      "small-details-t": ["12px", { lineHeight: "16.8px" }],
      "small-details-m": ["10px", { lineHeight: "14px" }],
      minor: ["15px", { lineHeight: "21px" }],
      "minor-t": ["12px", { lineHeight: "16.8px" }],
      "minor-m": ["10px", { lineHeight: "14px" }],
    },
    fontFamily: {
      MODE: "var(--font-MODE)",
    },
    extend: {
      animation: {
        marquee: "marquee 50s linear infinite",
        marquee2: "marquee2 50s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
