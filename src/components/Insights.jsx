import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset, Zap, Info } from 'lucide-react';

const Insights = ({ weather }) => {
  if (!weather) return null;

  const { current, forecast } = weather;
  const astro = forecast.forecastday[0].astro;

  const getSmartMessage = () => {
    const temp = current.temp_c;
    const condition = current.condition.text.toLowerCase();
    const humidity = current.humidity;

    if (temp > 38) return "Extremely hot! Stay hydrated and avoid outdoors.";
    if (temp > 30 && humidity > 70) return "High humidity today. It'll feel much hotter.";
    if (condition.includes('rain')) return "Rain expected. Keep an umbrella handy!";
    if (current.uv > 8) return "High UV levels. Wear sunscreen if going out.";
    if (temp < 15) return "Cooler than usual for Lahore. Grab a light jacket.";
    return "Weather looks pleasant for outdoor activities today.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card-dark p-6 w-full max-w-md flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-yellow-400" fill="currentColor" size={18} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Smart Insights</h3>
        </div>

        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-opacity">
            <Info size={40} />
          </div>
          <p className="text-lg font-medium text-white leading-tight pr-4">
            {getSmartMessage()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <Sunrise className="text-orange-400" />
            <span className="text-xs font-bold text-white/40 uppercase">Sunrise</span>
          </div>
          <span className="font-bold text-lg">{astro.sunrise}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <Sunset className="text-indigo-400" />
            <span className="text-xs font-bold text-white/40 uppercase">Sunset</span>
          </div>
          <span className="font-bold text-lg">{astro.sunset}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;
