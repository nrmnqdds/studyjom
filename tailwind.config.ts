import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        default: "2px 2px 0px rgba(0, 0, 0, 1)",
        "default-md": "4px 4px 0px rgba(0, 0, 0, 1)",
        "default-lg": "8px 8px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
