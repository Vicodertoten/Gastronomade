/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Anciennes couleurs (pour compatibilité)
        'beige-creme': 'var(--mv-cream)',
        'vert-foret': 'var(--mv-forest)',
        'vert-foret-doux': 'var(--mv-leaf)',
        'bois-clair': 'var(--mv-amber)',
        'naturel': 'var(--mv-plum)',

        // Nouvelles couleurs MV
        'mv-leaf': 'var(--mv-leaf)',
        'mv-coral': 'var(--mv-coral)',
        'mv-amber': 'var(--mv-amber)',
        'mv-red': 'var(--mv-red)',
        'mv-plum': 'var(--mv-plum)',
        'mv-cream': 'var(--mv-cream)',
        'mv-forest': 'var(--mv-forest)',
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