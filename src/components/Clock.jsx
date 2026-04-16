import React from 'react';
import { motion } from 'framer-motion';
import { useClock } from '../hooks/useClock';
import { Clock as ClockIcon, Calendar } from 'lucide-react';

const Clock = () => {
  const { formattedTime, formattedDate, is24Hour, toggleFormat } = useClock();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <div
        onClick={toggleFormat}
        className="cursor-pointer group relative"
      >
        <h1 className="text-clamp-title font-bold tracking-tighter text-white drop-shadow-2xl font-['JetBrains_Mono']">
          {formattedTime}
        </h1>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-xs px-2 py-1 rounded">
          {is24Hour ? '24H' : '12H'}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2 text-white/80 font-medium tracking-wide bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
        <Calendar size={18} className="text-primary" />
        <p className="text-clamp-body">{formattedDate}</p>
        <span className="mx-1 opacity-30">|</span>
        <p className="text-xs uppercase tracking-widest font-bold text-primary">PKT</p>
      </div>
    </motion.div>
  );
};

export default Clock;
