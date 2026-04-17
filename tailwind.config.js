/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00b7af",
        dark: "#10181f",
        secondary: "#6a7071",
        "weather-sunny": "#fbbf24",
        "weather-cloudy": "#94a3b8",
        "weather-rainy": "#3b82f6",
        "weather-storm": "#6366f1",
        "weather-night": "#1e1b4b",
        "temp-cold": "#60a5fa",
        "temp-warm": "#fb923c",
        "temp-hot": "#f87171",
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
