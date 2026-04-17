import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset, Zap, Info } from 'lucide-react';

const Insights = ({ weather }) => {
  if (!weather) return null;

  const { current, forecast } = weather;
  const astro = forecast.forecastday[0].astro;

  const getSmartMessageData = () => {
    const temp = current.temp_c;
    const condition = current.condition.text.toLowerCase();
    const humidity = current.humidity;

    if (temp > 38) return {
      msg: "Extremely hot! Stay hydrated and avoid outdoors.",
      color: "bg-rose-500/20 border-rose-500/30 text-rose-200",
      accent: "text-rose-500"
    };
    if (temp > 30 && humidity > 70) return {
      msg: "High humidity today. It'll feel much hotter.",
      color: "bg-orange-500/20 border-orange-500/30 text-orange-200",
      accent: "text-orange-500"
    };
    if (condition.includes('rain')) return {
      msg: "Rain expected. Keep an umbrella handy!",
      color: "bg-blue-500/20 border-blue-500/30 text-blue-200",
      accent: "text-blue-500"
    };
    if (current.uv > 8) return {
      msg: "High UV levels. Wear sunscreen if going out.",
      color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-200",
      accent: "text-yellow-500"
    };
    if (temp < 15) return {
      msg: "Cooler than usual for Lahore. Grab a light jacket.",
      color: "bg-sky-500/20 border-sky-500/30 text-sky-200",
      accent: "text-sky-500"
    };
    return {
      msg: "Weather looks pleasant for outdoor activities today.",
      color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-200",
      accent: "text-emerald-500"
    };
  };

  const insightData = getSmartMessageData();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card-dark p-6 w-full max-w-md flex flex-col justify-between h-full border border-white/5"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className={`${insightData.accent}`} fill="currentColor" size={18} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Smart Insights</h3>
        </div>

        <div className={`${insightData.color} border p-5 rounded-2xl mb-6 relative overflow-hidden group shadow-lg transition-all duration-500`}>
          <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
            <Info size={60} />
          </div>
          <p className="text-lg font-bold leading-tight pr-4 drop-shadow-sm">
            {insightData.msg}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-orange-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
              <Sunrise className="text-orange-400" size={20} />
            </div>
            <span className="text-xs font-bold text-white/40 uppercase group-hover:text-white/60">Sunrise</span>
          </div>
          <span className="font-black text-xl text-orange-200">{astro.sunrise}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
              <Sunset className="text-indigo-400" size={20} />
            </div>
            <span className="text-xs font-bold text-white/40 uppercase group-hover:text-white/60">Sunset</span>
          </div>
          <span className="font-black text-xl text-indigo-200">{astro.sunset}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;
