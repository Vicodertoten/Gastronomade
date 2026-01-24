/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Couleurs Gastro
        'beige-creme': 'var(--gastro-cream)',
        'terracotta': 'var(--gastro-terracotta)',
        'safran': 'var(--gastro-saffron)',
        'bourgogne': 'var(--gastro-burgundy)',
        'olive': 'var(--gastro-olive)',
        'charbon': 'var(--gastro-charcoal)',

        // Classes Gastro complètes
        'gastro-terracotta': 'var(--gastro-terracotta)',
        'gastro-saffron': 'var(--gastro-saffron)',
        'gastro-burgundy': 'var(--gastro-burgundy)',
        'gastro-olive': 'var(--gastro-olive)',
        'gastro-cream': 'var(--gastro-cream)',
        'gastro-charcoal': 'var(--gastro-charcoal)',
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