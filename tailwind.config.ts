import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
import * as tlAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      shadowSizes: {
        sm: "0px 0px 2px",
        md: "0px 0px 4px",
        lg: "0px 0px 8px",
      },
      shadowColors: {
        primary: "hsla(var(--primary))",
        secondary: "hsla(var(--secondary))",
        destructive: "hsla(var(--destructive))",
        muted: "hsla(var(--muted))",
        accent: "hsla(var(--accent))",
        "chart-1": "hsla(var(--chart-1))",
        "chart-2": "hsla(var(--chart-2))",
      },
    },
  },
  plugins: [
    tlAnimate,
    plugin(({ matchUtilities, addUtilities, theme }) => {
      const sizes = theme("shadowSizes");
      const colors = theme("shadowColors");

      if (!sizes || !colors) return;

      matchUtilities(
        {
          "icon-shadow": (value) => ({
            filter: `drop-shadow(${value})`,
          }),
        },
        {
          values: Object.fromEntries(
            Object.entries(sizes).flatMap(([sizeKey, sizeValue]) =>
              Object.entries(colors).map(([colorKey, colorValue]) => [
                `${colorKey}-${sizeKey}`,
                `${sizeValue} ${colorValue}`,
              ])
            )
          ),
        }
      );

      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // Для IE і Edge
          "scrollbar-width": "none", // Для Firefox
        },
      });
    }),
  ],
} satisfies Config;
