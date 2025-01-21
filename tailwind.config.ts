import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
    daisyui,
  ],

  daisyui: {
    themes: ["light", "dark", "cupcake" , "winter", "dracula"], // 사용할 테마 설정
  },
} satisfies Config;
