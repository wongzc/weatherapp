import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

import snow_icon from '../Assets/snow.png';
import im_01d from '../Assets/01d.png';
import im_01n from '../Assets/01n.png';
import im_02d from '../Assets/02d.png';
import im_02n from '../Assets/02n.png';
import im_03d from '../Assets/03d.png';
import im_03n from '../Assets/03n.png';
import im_04d from '../Assets/04d.png';
import im_04n from '../Assets/04n.png';
import im_09d from '../Assets/09d.png';
import im_09n from '../Assets/09n.png';
import im_10d from '../Assets/10d.png';
import im_10n from '../Assets/10n.png';
import im_11 from '../Assets/11.png';
import im_50 from '../Assets/50.png';
const config = require('./config.json');

const WeatherApp = () => {
  const apiKey = config.apiKey;
  const[wicon,setWicon] =useState(im_02d);
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

    if (data.weather[0].icon==="01d")
    {
      setWicon(im_01d);
    }
    else if (data.weather[0].icon==="01n")
    {
      setWicon(im_01n);
    }
    else if (data.weather[0].icon==="02d")
    {
      setWicon(im_02d);
    }
    else if (data.weather[0].icon==="02n")
    {
      setWicon(im_02n);
    }
    else if (data.weather[0].icon==="03d")
    {
      setWicon(im_03d);
    }
    else if (data.weather[0].icon==="03n")
    {
      setWicon(im_03n);
    }
    else if (data.weather[0].icon==="04d")
    {
      setWicon(im_04d);
    }
    else if (data.weather[0].icon==="04n")
    {
      setWicon(im_04n);
    }
    else if (data.weather[0].icon==="09d")
    {
      setWicon(im_09d);
    }
    else if (data.weather[0].icon==="09n")
    {
      setWicon(im_09n);
    }
    else if (data.weather[0].icon==="10d")
    {
      setWicon(im_10d);
    }
    else if (data.weather[0].icon==="10n")
    {
      setWicon(im_10n);
    }
    else if (data.weather[0].icon==="11d" || data.weather[0].icon==="11n")
    {
      setWicon(im_11);
    }
    else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
    {
      setWicon(snow_icon);
    }
    else if (data.weather[0].icon==="50d" || data.weather[0].icon==="50n")
    {
      setWicon(im_50);
    }
    else
    {
      setWicon(im_02d);
    }

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
