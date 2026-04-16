import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Activity, Info } from 'lucide-react';

const AQIInfo = ({ aqi }) => {
  if (!aqi) return null;

  const epaIndex = aqi['us-epa-index'];
  const levels = [
    { label: 'Good', color: 'bg-green-500', text: 'text-green-500', desc: 'Air quality is satisfactory.' },
    { label: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-500', desc: 'Air quality is acceptable.' },
    { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', text: 'text-orange-500', desc: 'Members of sensitive groups may experience health effects.' },
    { label: 'Unhealthy', color: 'bg-red-500', text: 'text-red-500', desc: 'Everyone may begin to experience health effects.' },
    { label: 'Very Unhealthy', color: 'bg-purple-500', text: 'text-purple-500', desc: 'Health alert: risk of health effects is increased for everyone.' },
    { label: 'Hazardous', color: 'bg-rose-900', text: 'text-rose-900', desc: 'Health warning of emergency conditions.' }
  ];

  const currentLevel = levels[epaIndex - 1] || levels[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card-dark p-6 w-full max-w-md"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-primary" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Air Quality Index</h3>
        </div>
        <div className={`${currentLevel.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
          {currentLevel.label}
        </div>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <span className="text-5xl font-bold tracking-tighter">
          {Math.round(aqi.pm2_5)}
        </span>
        <div className="flex flex-col mb-1">
          <span className="text-xs font-bold text-white/40 uppercase">PM2.5 (µg/m³)</span>
          <span className={`${currentLevel.text} text-sm font-bold`}>{currentLevel.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <AQIPollutant label="PM10" value={Math.round(aqi.pm10)} />
        <AQIPollutant label="NO2" value={Math.round(aqi.no2)} />
        <AQIPollutant label="O3" value={Math.round(aqi.o3)} />
      </div>

      <p className="text-xs text-white/60 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5 italic">
        " {currentLevel.desc} "
      </p>
    </motion.div>
  );
};

const AQIPollutant = ({ label, value }) => (
  <div className="bg-white/5 p-2 rounded-lg text-center border border-white/5">
    <p className="text-[10px] text-white/40 font-bold mb-1">{label}</p>
    <p className="text-sm font-bold">{value}</p>
  </div>
);

export default AQIInfo;
