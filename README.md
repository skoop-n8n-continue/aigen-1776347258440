# Lahore Weather + Clock App

A modern, advanced Weather and Clock application specifically optimized for Lahore, Pakistan. Built with React, Tailwind CSS, and Framer Motion.

## Features

- **Real-time Weather**: Current conditions, temperature, humidity, wind, and UV index.
- **7-Day Forecast**: Daily summaries with max/min temperatures and rain probability.
- **Hourly Forecast**: 24-hour horizontal scrollable forecast.
- **Air Quality Index (AQI)**: Detailed insights into PM2.5, PM10, and other pollutants.
- **Live Clock**: High-precision digital clock with 12h/24h toggle and PKT timezone.
- **Smart Insights**: Weather-based recommendations and sunrise/sunset times.
- **Dynamic Backgrounds**: Visual effects (Rain, Stars, Gradients) that change based on current weather and time of day.
- **Fully Responsive**: Optimized layouts for Mobile, Tablet, and Desktop.
- **Glassmorphism UI**: Beautiful, premium design with blur effects and smooth animations.
- **Offline Support**: Caches last fetched data for viewing when offline.

## Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Date-fns** (Date formatting)
- **WeatherAPI.com** (Weather Data)

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up API Key**:
   The app uses a placeholder key for demonstration. For production use, get a free key from [WeatherAPI.com](https://www.weatherapi.com/) and update it in `src/services/weatherService.js`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Folder Structure

- `src/components/`: Reusable UI components (Clock, WeatherCard, Forecast, etc.)
- `src/hooks/`: Custom React hooks (useWeather, useClock)
- `src/services/`: API integration services
- `src/utils/`: Helper functions
- `src/index.css`: Tailwind and global styles
- `index.html`: Main entry point with cache-busting meta tags

## Responsive Breakpoints

- **Mobile (sm)**: Full vertical layout with compact clock and swipeable forecast.
- **Tablet (md)**: Balanced vertical stack with medium-sized elements.
- **Desktop (lg+)**: Centered layouts with large hero clock and side-by-side details.

---
Built by Skoop Agent
