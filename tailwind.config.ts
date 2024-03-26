import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          text: "#292925",
          bg: "#FAF4E6",
          primary: "#5AD05F",
          secondary: "#B9DF8D",
          accent: "#99D56C",
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 12s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      boxShadow: {
        "neo-brutalist": "8px 8px 0 0 #000000",
        "neo-brutalist-hover": "4px 4px 0 0 #000000",
      },

      borderRadius: {
        "neo-brutalist": "5px",
      },
      borderWidth: {
        "neo-brutalist": "4px",
      },
    },
  },
  plugins: [],
};
export default config;
