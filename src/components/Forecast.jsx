import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CloudRain } from 'lucide-react';

const Forecast = ({ forecast, unit = 'C' }) => {
  if (!forecast) return null;

  const hourlyData = forecast.forecastday[0].hour;
  const currentHour = new Date().getHours();
  const next24Hours = hourlyData.slice(currentHour).concat(forecast.forecastday[1]?.hour.slice(0, currentHour) || []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 mt-8">
      {/* Hourly Forecast */}
      <section>
        <h3 className="text-lg font-bold uppercase tracking-widest text-primary/80 mb-4 px-4">Hourly Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 hide-scrollbar snap-x">
          {next24Hours.map((hour, idx) => {
            const temp = unit === 'C' ? hour.temp_c : hour.temp_f;
            return (
              <motion.div
                key={hour.time}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="min-w-[100px] glass-card p-4 flex flex-col items-center gap-2 snap-center"
              >
                <p className="text-sm text-white/60 font-medium">
                  {idx === 0 ? 'Now' : format(new Date(hour.time), 'ha')}
                </p>
                <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10" />
                <p className="text-lg font-bold">{Math.round(temp)}°</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 7-Day Forecast */}
      <section className="px-4">
        <h3 className="text-lg font-bold uppercase tracking-widest text-primary/80 mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {forecast.forecastday.map((day, idx) => {
            const maxTemp = unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
            const minTemp = unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-dark p-4 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 border-l-4 border-l-primary lg:border-l-0 lg:border-b-4 lg:border-b-primary"
              >
                <div className="flex flex-col lg:items-center">
                  <p className="font-bold">
                    {idx === 0 ? 'Today' : format(new Date(day.date), 'EEE')}
                  </p>
                  <p className="text-xs text-white/40">{format(new Date(day.date), 'MMM d')}</p>
                </div>

                <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12" />

                <div className="flex flex-col items-end lg:items-center">
                  <div className="flex gap-2">
                    <span className="font-bold text-lg">{Math.round(maxTemp)}°</span>
                    <span className="text-white/40">{Math.round(minTemp)}°</span>
                  </div>
                  {day.day.daily_chance_of_rain > 0 && (
                    <div className="flex items-center gap-1 text-blue-400 text-[10px] font-bold">
                      <CloudRain size={10} />
                      {day.day.daily_chance_of_rain}%
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Forecast;
