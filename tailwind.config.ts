import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      // Adding animation delay utilities
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
        "1200": "1200ms", // for product image 1 (1000 + 0*200)
        "1400": "1400ms", // for product image 2 (1000 + 1*200)
        "1600": "1600ms", // for product image 3 (1000 + 2*200)
        "1800": "1800ms", // for product image 4 (1000 + 3*200)
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    ({ addUtilities, theme }: { addUtilities: any; theme: any }) => {
      const newUtilities = {
        ".animation-delay-100": { animationDelay: theme("animationDelay.100") },
        ".animation-delay-200": { animationDelay: theme("animationDelay.200") },
        ".animation-delay-300": { animationDelay: theme("animationDelay.300") },
        ".animation-delay-400": { animationDelay: theme("animationDelay.400") },
        ".animation-delay-500": { animationDelay: theme("animationDelay.500") },
        ".animation-delay-600": { animationDelay: theme("animationDelay.600") },
        ".animation-delay-700": { animationDelay: theme("animationDelay.700") },
        ".animation-delay-800": { animationDelay: theme("animationDelay.800") },
        ".animation-delay-900": { animationDelay: theme("animationDelay.900") },
        ".animation-delay-1000": { animationDelay: theme("animationDelay.1000") },
        ".animation-delay-1200": { animationDelay: theme("animationDelay.1200") },
        ".animation-delay-1400": { animationDelay: theme("animationDelay.1400") },
        ".animation-delay-1600": { animationDelay: theme("animationDelay.1600") },
        ".animation-delay-1800": { animationDelay: theme("animationDelay.1800") },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    },
  ],
} satisfies Config

export default config
