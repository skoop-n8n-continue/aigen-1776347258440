import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Thermometer, MapPin } from 'lucide-react';

const WeatherCard = ({ weather, loading, unit = 'C' }) => {
  if (loading || !weather) {
    return (
      <div className="glass-card p-8 animate-pulse w-full max-w-2xl mx-auto h-64 flex flex-col justify-center">
        <div className="h-8 bg-white/10 rounded w-1/3 mb-4"></div>
        <div className="h-16 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-12 bg-white/10 rounded"></div>
          <div className="h-12 bg-white/10 rounded"></div>
          <div className="h-12 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const { current, location } = weather;
  const temp = unit === 'C' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card-dark p-6 md:p-8 w-full max-w-4xl mx-auto relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Main Temp & Condition */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MapPin size={18} />
            <h2 className="text-xl font-semibold tracking-tight">
              {location.name}, {location.country}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-7xl md:text-8xl font-bold tracking-tighter">
              {Math.round(temp)}°
            </span>
            <img
              src={current.condition.icon}
              alt={current.condition.text}
              className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
            />
          </div>

          <p className="text-2xl font-medium text-white/90 mt-2">
            {current.condition.text}
          </p>
          <p className="text-white/60">
            Feels like <span className="text-white font-semibold">{Math.round(feelsLike)}°{unit}</span>
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4 w-full md:w-auto">
          <DetailItem
            icon={<Droplets className="text-blue-400" />}
            label="Humidity"
            value={`${current.humidity}%`}
          />
          <DetailItem
            icon={<Wind className="text-teal-400" />}
            label="Wind"
            value={`${current.wind_kph} km/h`}
          />
          <DetailItem
            icon={<Sun className="text-yellow-400" />}
            label="UV Index"
            value={current.uv}
          />
          <DetailItem
            icon={<Thermometer className="text-red-400" />}
            label="Visibility"
            value={`${current.vis_km || 10} km`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-3">
    <div className="p-2 bg-white/5 rounded-lg">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export default WeatherCard;
