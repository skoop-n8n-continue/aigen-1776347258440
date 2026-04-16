const API_KEY = 'b1932fd765044453894101140232603'; // Placeholder / Demo key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city = 'Lahore') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather service error:', error);
    // Return mock data for demonstration if API fails
    return getMockData(city);
  }
};

const getMockData = (city) => {
  const isLahore = city.toLowerCase() === 'lahore';
  return {
    location: {
      name: city,
      region: isLahore ? 'Punjab' : 'Unknown',
      country: isLahore ? 'Pakistan' : 'Unknown',
      localtime: new Date().toISOString(),
      tz_id: isLahore ? 'Asia/Karachi' : 'UTC'
    },
    current: {
      temp_c: 32,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      wind_kph: 15,
      humidity: 40,
      feelslike_c: 35,
      uv: 8,
      air_quality: {
        'us-epa-index': 3,
        pm2_5: 45.2,
        pm10: 88.1,
        no2: 12.5,
        o3: 65.4,
        so2: 2.1
      }
    },
    forecast: {
      forecastday: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        day: {
          maxtemp_c: 35 + Math.random() * 5,
          mintemp_c: 25 + Math.random() * 3,
          condition: {
            text: i % 3 === 0 ? 'Partly cloudy' : 'Sunny',
            icon: i % 3 === 0 ? '//cdn.weatherapi.com/weather/64x64/day/116.png' : '//cdn.weatherapi.com/weather/64x64/day/113.png'
          },
          daily_chance_of_rain: i % 5 === 0 ? 20 : 0
        },
        hour: Array.from({ length: 24 }, (_, h) => ({
          time: `${new Date().toISOString().split('T')[0]} ${h.toString().padStart(2, '0')}:00`,
          temp_c: 28 + Math.sin(h / 4) * 5,
          condition: { text: 'Clear', icon: '//cdn.weatherapi.com/weather/64x64/night/113.png' }
        }))
      }))
    }
  };
};
