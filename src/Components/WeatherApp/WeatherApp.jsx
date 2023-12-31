import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import humidity_d_icon from '../Assets/humidity_d.png';
import wind_icon from '../Assets/wind.png';
import wind_d_icon from '../Assets/wind_d.png';
import other_icon from '../Assets/other.png';

const config = require('./config.json');
const weatherIcons = {
  "01d": require('../Assets/01d.png'),
  "01n": require('../Assets/01n.png'),
  "02d": require('../Assets/02d.png'),
  "02n": require('../Assets/02n.png'),
  "03d": require('../Assets/03d.png'),
  "03n": require('../Assets/03n.png'),
  "04d": require('../Assets/04d.png'),
  "04n": require('../Assets/04n.png'),
  "09d": require('../Assets/09d.png'),
  "09n": require('../Assets/09n.png'),
  "10d": require('../Assets/10d.png'),
  "10n": require('../Assets/10n.png'),
  "11d": require('../Assets/11.png'),
  "50d": require('../Assets/50.png'),
  "11n": require('../Assets/11.png'),
  "50n": require('../Assets/50.png'),
  "13d": require('../Assets/snow.png'),
  "13n": require('../Assets/snow.png'),
};


const WeatherApp = () => {
  const apiKey = config.apiKey;
  const [wicon,setWicon] = useState(weatherIcons["02d"]);
  const [daynight, setDaynight]= useState("container day");
  const [humidity, setHumidity] = useState("64 %");
  const [windSpeed, setWindSpeed] = useState("18 km/h");
  const [temperature, setTemperature] = useState("24 °C");
  const [location, setLocation] = useState("London");
  const [weather, setWeather] = useState("Cloud");
  const [error, setError] = useState(null);
  const [windicon, setWindicon] = useState(wind_d_icon);
  const [humidityicon, setHumidityicon] = useState(humidity_d_icon);
  
    
  const search =async()=> {
    const element =document.getElementsByClassName("cityInput");
    if(element[0].value==="")
    {
      return;
    }
    try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    setHumidity(`${data.main.humidity} %`);
    setWindSpeed(`${Math.floor(data.wind.speed)} km`);
    setTemperature(`${Math.floor(data.main.temp)} °C`);
    setWeather(data.weather[0].main);
    setLocation(data.name);
    setWeatherInfo(data);
    setError(null);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    setError('Error fetching weather data. Please try again!');
  }
  }
  const setWeatherInfo = (data) =>{
    const iconCode=data.weather[0].icon;
    const isDay = iconCode.endsWith("d");
    const checkHaze = data.weather[0].main;
    setWicon(weatherIcons[iconCode] || weatherIcons["02d"]);
    if (checkHaze === "Haze"){
      setDaynight("container haze");
    } else {
      setDaynight(isDay ? "container day" : "container night");
    }
    setWindicon(isDay ? wind_d_icon: wind_icon);
    setHumidityicon(isDay ? humidity_d_icon: humidity_icon);
  }
  return (
    <div className={daynight}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search"/>
        <div className="search-icon" onClick={()=>search()} title="Search">
            <img src={search_icon} alt="" />
        </div>
        <div className="search-icon" title="Other Country">
            <img src={other_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" className="icon-weather" title=""/>
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-desc">{weather}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
            <img src={humidityicon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">{humidity}</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={windicon} alt="" className="icon"/>
            <div className="data">
                <div className="wind-rate">{windSpeed}</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default WeatherApp
