import { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b6f06d04fd6f7dede359be36f50e6f1b`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching weather data:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError("Error getting location: " + error.message);
            console.error("Error getting location:", error);

            fetchWeather(41.2995, 69.2401);
          }
        );
      } else {
        setError("Location is not eligible");
        fetchWeather(41.2995, 69.2401);
      }
    };

    getLocation();
  }, []);

  if (error) {
    return <div className="flex items-center text-red-500">{error}</div>;
  }

  return (
    <div className=" flex  items-center">
      {weather ? (
        <div className="text-center flex justify-between gap-3  items-center ">
          <p className="text-lg font-semibold">{weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
