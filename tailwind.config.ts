import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      colors: {
        golden: "#DAC165",
        black: "#000000",
        gray: {
          DEFAULT: "#464141",
          light: "#AAAAAA",
        },
        crimson: "rgba(227, 204, 231, 0.96)",
      },
      fontFamily: {
        base: ["var(--font-base)"],
        alt: ["var(--font-alt)"],
      },
      animation: {
        'slide-bottom': 'slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'slide-bottom': {
          '0%': { transform: 'translateY(-25%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;