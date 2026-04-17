import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CloudRain } from 'lucide-react';

const Forecast = ({ forecast, unit = 'C' }) => {
  if (!forecast) return null;

  const hourlyData = forecast.forecastday[0].hour;
  const currentHour = new Date().getHours();
  const next24Hours = hourlyData.slice(currentHour).concat(forecast.forecastday[1]?.hour.slice(0, currentHour) || []);

  const getTempColorClass = (t, u) => {
    const val = u === 'C' ? t : (t - 32) * 5 / 9;
    if (val <= 10) return 'text-blue-400';
    if (val <= 20) return 'text-sky-300';
    if (val <= 30) return 'text-weather-sunny';
    if (val <= 38) return 'text-orange-500';
    return 'text-rose-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 mt-8">
      {/* Hourly Forecast */}
      <section>
        <h3 className="text-lg font-bold uppercase tracking-widest text-primary/80 mb-4 px-4">Hourly Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 hide-scrollbar snap-x">
          {next24Hours.map((hour, idx) => {
            const temp = unit === 'C' ? hour.temp_c : hour.temp_f;
            const isRain = hour.chance_of_rain > 30;
            return (
              <motion.div
                key={hour.time}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`min-w-[110px] glass-card p-4 flex flex-col items-center gap-2 snap-center transition-all hover:bg-white/15 ${isRain ? 'border-blue-500/30' : 'border-white/10'}`}
              >
                <p className="text-sm text-white/60 font-medium">
                  {idx === 0 ? 'Now' : format(new Date(hour.time), 'ha')}
                </p>
                <img src={hour.condition.icon} alt={hour.condition.text} className="w-12 h-12 drop-shadow-md" />
                <p className={`text-xl font-black ${getTempColorClass(temp, unit)}`}>{Math.round(temp)}°</p>
                {hour.chance_of_rain > 0 && (
                  <div className="w-full mt-1">
                    <div className="flex items-center justify-between text-[10px] text-blue-300 mb-1">
                      <span>Rain</span>
                      <span>{hour.chance_of_rain}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${hour.chance_of_rain}%` }}
                      />
                    </div>
                  </div>
                )}
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
            const chanceOfRain = day.day.daily_chance_of_rain;

            const dayColor = chanceOfRain > 50 ? 'border-b-blue-500' : 'border-b-primary';

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card-dark p-4 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 border-l-4 lg:border-l-0 lg:border-b-4 ${dayColor} group hover:bg-white/5 transition-colors`}
              >
                <div className="flex flex-col lg:items-center">
                  <p className="font-black text-white/90 group-hover:text-primary transition-colors">
                    {idx === 0 ? 'Today' : format(new Date(day.date), 'EEE')}
                  </p>
                  <p className="text-xs text-white/40">{format(new Date(day.date), 'MMM d')}</p>
                </div>

                <div className="relative">
                  <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-14 h-14 drop-shadow-lg" />
                  {chanceOfRain > 30 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                      {chanceOfRain}%
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end lg:items-center">
                  <div className="flex gap-2">
                    <span className={`font-black text-xl ${getTempColorClass(maxTemp, unit)}`}>{Math.round(maxTemp)}°</span>
                    <span className="text-white/30 text-lg font-bold">{Math.round(minTemp)}°</span>
                  </div>
                  <p className="text-[10px] text-white/40 font-medium truncate max-w-[80px] lg:text-center">
                    {day.day.condition.text}
                  </p>
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
