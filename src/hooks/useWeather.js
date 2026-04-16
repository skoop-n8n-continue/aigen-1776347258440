import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from '../services/weatherService';

export const useWeather = (initialCity = 'Lahore') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(() => {
    return localStorage.getItem('selectedCity') || initialCity;
  });

  const updateWeather = useCallback(async (targetCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(targetCity);
      setWeather(data);
      localStorage.setItem('cachedWeather', JSON.stringify(data));
      localStorage.setItem('lastFetchTime', Date.now().toString());
    } catch (err) {
      setError(err.message);
      // Try to load from cache if network fails
      const cached = localStorage.getItem('cachedWeather');
      if (cached) {
        setWeather(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateWeather(city);

    // Auto refresh every 15 minutes
    const interval = setInterval(() => {
      updateWeather(city);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city, updateWeather]);

  const changeCity = (newCity) => {
    setCity(newCity);
    localStorage.setItem('selectedCity', newCity);
  };

  return {
    weather,
    loading,
    error,
    city,
    changeCity,
    refresh: () => updateWeather(city)
  };
};
