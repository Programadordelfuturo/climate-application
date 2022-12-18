import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [ weather, setWeather ] = useState({});
  const [ temperature, setTemperature ] = useState(true);

  useEffect (() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios 
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=774a53a8fd536fe3e3457bb577bc9aa8`)
      .then((res) => {setWeather(res.data); console.log(lat, lon)});
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  
   const measurementChange = () => {
    setTemperature(!temperature)
   }

  //  let fundTime = weather.weather?.[0].icon;
  
  console.log(weather);

  return (
    <div className="App">
      <div className="sub-app">
        <h1>Your clima</h1>
        <p>{weather.sys?.[1]}</p>
        <strong><p>{weather.name}{", "}{weather.sys?.country}</p></strong>
        <div className='container-body'>
          <div className='primer-container-body'>
            <strong><p id='title'>{weather.weather?.[0].description}</p></strong>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="image" />
            <p id='temp'>
              {temperature ? Math.floor((weather.main?.temp) - 273.15) : Math.floor(((weather.main?.temp) - 273.15)* 9/5 + 32)}
              <strong>{temperature ? "°C" : "°F"}</strong>
            </p>
          </div>
          <div className='second-container-body'>
            <p><strong>scattered clouds</strong></p>
            <p><i class="fa-solid fa-wind"></i><strong> wind speed:</strong> {weather.wind?.speed} m/s</p>
            <p><i class="fa-solid fa-cloud"></i><strong> clouds:</strong> <strong>{weather.clouds?.all} %</strong></p>
            <p><i class="fa-solid fa-temperature-half"></i><strong> pressure:</strong> {weather.main?.pressure} mb</p>
          </div>
        </div>   
        <button onClick={measurementChange}>°C / °F</button>
      </div>
    </div>
  )
}

export default App
