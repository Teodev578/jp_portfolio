/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // C'est cette ligne qui débloque tout !
  ],
  theme: {
    extend: {
      // On connecte Tailwind à tes variables CSS existantes !
      fontFamily: {
        sans: ['var(--font-headline)', 'sans-serif'], // Ton Space Grotesk
        mono: ['var(--font-body)', 'monospace'],      // Ton Space Mono
        serif: ['Playfair Display', 'Times New Roman', 'serif'], // Police élégante pour le contraste "Magazine"
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}