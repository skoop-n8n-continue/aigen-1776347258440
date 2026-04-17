import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, RefreshCw, Moon, Sun, Settings } from 'lucide-react';
import Clock from './components/Clock';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import AQIInfo from './components/AQIInfo';
import Insights from './components/Insights';
import { useWeather } from './hooks/useWeather';

const App = () => {
  const { weather, loading, error, city, changeCity, refresh } = useWeather('Lahore');
  const [searchInput, setSearchInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C');

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      changeCity(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          changeCity(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return 'bg-dark';
    const condition = weather.current.condition.text.toLowerCase();
    const isDay = weather.current.is_day;

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950';
    }
    if (condition.includes('thunder') || condition.includes('storm')) {
      return 'bg-gradient-to-br from-indigo-900 via-gray-900 to-black';
    }
    if (condition.includes('snow') || condition.includes('sleet')) {
      return 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500';
    }
    if (condition.includes('cloud') || condition.includes('overcast')) {
      if (!isDay) return 'bg-gradient-to-br from-slate-800 via-slate-900 to-black';
      return 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600';
    }
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      return 'bg-gradient-to-br from-gray-400 via-gray-600 to-slate-800';
    }

    if (!isDay) return 'bg-gradient-to-br from-indigo-950 via-dark to-black';

    // Clear/Sunny Day - maybe check time for sunset/sunrise vibes
    return 'bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-500';
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${getBackgroundClass()} text-white relative overflow-hidden pb-12`}>
      {/* Dynamic Background Effects */}
      <AnimatePresence>
        {weather?.current.condition.text.toLowerCase().includes('rain') && (
          <RainEffect />
        )}
      </AnimatePresence>

      {!weather?.current.is_day && <StarsEffect />}

      {/* Header / Nav */}
      <header className="relative z-10 px-4 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <RefreshCw className={`${loading ? 'animate-spin' : ''} cursor-pointer text-dark`} size={24} onClick={refresh} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-white/90">
            Skoop <span className="text-primary drop-shadow-[0_0_8px_rgba(0,183,175,0.5)]">Weather</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96 group flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 pl-12 outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md group-hover:bg-white/10 group-focus-within:border-primary/50 group-focus-within:bg-white/10"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" size={20} />
          </div>
          <button
            type="button"
            onClick={handleLocationDetect}
            className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg"
            title="Use current location"
          >
            <MapPin size={20} className="text-primary" />
          </button>
          <button type="submit" className="hidden">Search</button>
        </form>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleUnit}
            className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all font-black text-sm w-12 h-12 flex items-center justify-center shadow-lg"
          >
            °{unit}
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all shadow-lg"
          >
            {isDarkMode ? <Sun size={20} className="text-weather-sunny" /> : <Moon size={20} className="text-indigo-400" />}
          </button>
          <button className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all shadow-lg">
            <Settings size={20} className="text-white/70" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 lg:px-8 space-y-8 md:space-y-12">
        {/* Hero Section: Clock */}
        <section className="py-8 md:py-12">
          <Clock />
        </section>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-xl text-center text-rose-200">
            {error}. Using cached/demo data instead.
          </div>
        )}

        {/* Current Weather Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          <div className="lg:col-span-8 w-full">
            <WeatherCard weather={weather} loading={loading} unit={unit} />
          </div>
          <div className="lg:col-span-4 w-full h-full">
            <Insights weather={weather} unit={unit} />
          </div>
        </div>

        {/* AQI & More Details */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-4 w-full">
            <AQIInfo aqi={weather?.current.air_quality} />
          </div>
          <div className="lg:col-span-8 w-full">
             {/* Dynamic location info or small secondary card */}
             <div className="glass-card-dark p-6 h-full flex items-center justify-center text-center">
                <div className="space-y-4">
                  <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Location Insights</h4>
                  <p className="text-clamp-body text-white/80">
                    Currently viewing weather for <span className="text-white font-bold">{weather?.location.name}</span>.
                    Local time is {weather?.location.localtime ? new Date(weather.location.localtime).toLocaleTimeString() : '...'}
                    in the Asia/Karachi timezone.
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <p className="text-xs text-white/40">Region</p>
                      <p className="font-bold">{weather?.location.region}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <p className="text-xs text-white/40">Lat/Long</p>
                      <p className="font-bold">{weather?.location.lat}, {weather?.location.lon}</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Forecast Section */}
        <Forecast forecast={weather?.forecast} unit={unit} />
      </main>

      {/* Footer / Mobile Sticky */}
      <footer className="mt-12 text-center text-white/20 text-xs py-8">
        <p>© 2026 Skoop Weather Agent. Data provided by WeatherAPI.</p>
        <p className="mt-1">Lahore, Punjab, Pakistan • PKT Timezone</p>
      </footer>
    </div>
  );
};

const RainEffect = () => {
  const drops = Array.from({ length: 50 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {drops.map((_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.3
          }}
        />
      ))}
    </div>
  );
};

const StarsEffect = () => {
  const stars = Array.from({ length: 100 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 2}px`,
            height: `${Math.random() * 2}px`,
            animationDuration: `${2 + Math.random() * 3}s`,
            opacity: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default App;
