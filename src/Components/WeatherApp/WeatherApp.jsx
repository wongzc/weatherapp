import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

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
  const[wicon,setWicon] =useState(weatherIcons["02d"]);
  const[daynight, setDaynight]=useState("container-day");

  const search =async()=> {
    const element =document.getElementsByClassName("cityInput");
    if(element[0].value==="")
    {return 0;}
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity =document.getElementsByClassName("humidity-percent");
    const wind =document.getElementsByClassName("wind-rate");
    const temperature =document.getElementsByClassName("weather-temp");
    const location =document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = Math.floor(data.wind.speed)+" km";
    temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
    location[0].innerHTML = data.name;

    const setWeatherInfo = (data) =>{
      const iconCode=data.weather[0].icon;
      setWicon(weatherIcons[iconCode] || weatherIcons["02d"]);
    }
    setWeatherInfo(data)
    if (data.weather[0].icon.substring(2,3) === "d")
    {setDaynight("container-day");}
    else 
    {setDaynight("container-night");}

  }
  return (
    <div className={daynight}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search"/>
        <div className="search-icon" onClick={()=>search()}>
            <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" className="icon-weather"/>
      </div>
      <div className="weather-temp">24 °C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className="icon"/>
            <div className="data">
                <div className="humidity-percent">64 %</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className="icon"/>
            <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
