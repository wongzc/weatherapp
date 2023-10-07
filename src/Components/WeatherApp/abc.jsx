import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const config = require('./config.json');
const weatherIcons = {
  "01d": require('../Assets/01d.png'),
  "01n": require('../Assets/01n.png'),
  "02d": require('../Assets/02d.png'),
  // ... Add the rest of the icons here
};

const WeatherApp = () => {
  const apiKey = config.apiKey;
  const [wicon, setWicon] = useState(weatherIcons["02d"]);
  const [daynight, setDaynight] = useState("container-day");
  const [humidity, setHumidity] = useState("64 %");
  const [windSpeed, setWindSpeed] = useState("18 km/h");
  const [temperature, setTemperature] = useState("24 °C");
  const [location, setLocation] = useState("London");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    const cityName = element[0].value.trim();
    if (!cityName) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      setHumidity(`${data.main.humidity} %`);
      setWindSpeed(`${Math.floor(data.wind.speed)} km`);
      setTemperature(`${Math.floor(data.main.temp)} °C`);
      setLocation(data.name);

      setWeatherInfo(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const setWeatherInfo = (data) => {
    const iconCode = data.weather[0].icon;
    const isDay = iconCode.endsWith("d");
    setWicon(weatherIcons[iconCode] || weatherIcons["02d"]);
    setDaynight(isDay ? "container-day" : "container-night");
  };

  return (
    <div className={daynight}>
      {/* ... Rest of your JSX */}
    </div>
  );
};

export default WeatherApp;