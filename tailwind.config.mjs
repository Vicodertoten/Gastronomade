/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette Gastronomade - Tons naturels
        'beige-creme': '#F5F5DC',
        'vert-foret': '#2F4F2F',
        'vert-foret-doux': '#4A5D4A',
        'bois-clair': '#D2B48C',
        'naturel': '#8B7355',
      },
      fontFamily: {
        // Typographie élégante
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}