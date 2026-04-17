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
        <h1 className="text-clamp-title font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-primary/50 drop-shadow-[0_0_30px_rgba(0,183,175,0.3)]">
          {formattedTime}
        </h1>
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
          {is24Hour ? '24H MODE' : '12H MODE'}
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
