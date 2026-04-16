import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const useClock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem('is24Hour');
    return saved === null ? false : JSON.parse(saved);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('is24Hour', JSON.stringify(is24Hour));
  }, [is24Hour]);

  const toggleFormat = () => setIs24Hour(!is24Hour);

  return {
    time,
    formattedTime: format(time, is24Hour ? 'HH:mm:ss' : 'hh:mm:ss a'),
    formattedDate: format(time, 'EEEE, MMMM do, yyyy'),
    is24Hour,
    toggleFormat
  };
};
