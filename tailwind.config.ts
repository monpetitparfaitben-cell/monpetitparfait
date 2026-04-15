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
        beige: {
          50: "#fdfcfa",
          100: "#F7F5F0",
          200: "#ede9e0",
          300: "#ddd7c9",
        },
        navy: {
          DEFAULT: "#18223b",
          light: "#253558",
          dark: "#0f1624",
        },
        brand: {
          orange: "#e67e22",
          "orange-dark": "#cf6d17",
          "orange-light": "#f39c12",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
