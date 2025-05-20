module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#4F46E5", // indigo-600
          hover: "#4338CA", // indigo-700
          light: "#E0E7FF", // indigo-100
          50: "#EBEAFD",
          100: "#D7D5FB",
          200: "#AFABF7",
          300: "#8781F3",
          400: "#5F57EF",
          500: "#4F46E5",
          600: "#2D23D0",
          700: "#221BA0",
          800: "#18136F",
          900: "#0E0C3F",
        },
        
        // Neutral Colors
        background: "#F8FAFC", // slate-50
        "background-dark": "#0F172A", // slate-900
        surface: "#FFFFFF", // white
        "surface-dark": "#1E293B", // slate-800
        border: "#E2E8F0", // slate-200
        "border-dark": "#334155", // slate-700
        "text-primary": "#0F172A", // slate-900
        "text-primary-dark": "#F1F5F9", // slate-100
        "text-secondary": "#475569", // slate-600
        "text-secondary-dark": "#94A3B8", // slate-400
        
        // Semantic Colors
        success: "#10B981", // emerald-500
        warning: "#F59E0B", // amber-500
        error: "#F43F5E", // rose-500
        info: "#0EA5E9", // sky-500
        focus: "#8B5CF6", // violet-500
        "mastery-low": "#F87171", // red-400
        "mastery-medium": "#FBBF24", // yellow-400
        "mastery-high": "#4ADE80", // green-400
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}