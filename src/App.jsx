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

   let fundTime = weather.weather?.[0].icon;
  //  let linkFundTime = ""
   
  //   switch (fundTime){
  //     case '01d':
  //       linkFundTime = 'https://images.pexels.com/photos/6129763/pexels-photo-6129763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '01n':
  //       linkFundTime = 'https://images.pexels.com/photos/14063661/pexels-photo-14063661.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     break
  //     case '02d':
  //       linkFundTime = 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '02n':
  //       linkFundTime = 'https://images.pexels.com/photos/10747988/pexels-photo-10747988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '03d':
  //       linkFundTime = 'https://images.pexels.com/photos/4915603/pexels-photo-4915603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '03n':
  //       linkFundTime = 'https://images.pexels.com/photos/4203094/pexels-photo-4203094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '04d':
  //       linkFundTime = 'https://images.pexels.com/photos/4203126/pexels-photo-4203126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '04n':
  //       linkFundTime = 'https://images.pexels.com/photos/4203126/pexels-photo-4203126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '09d':
  //       linkFundTime = 'https://images.pexels.com/photos/4203094/pexels-photo-4203094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '09n':
  //       linkFundTime = 'https://images.pexels.com/photos/4203094/pexels-photo-4203094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //     break
  //     case '10d':
  //       linkFundTime = 'https://images.pexels.com/photos/1755702/pexels-photo-1755702.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '10n':
  //       linkFundTime = 'https://images.pexels.com/photos/11408850/pexels-photo-11408850.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '11d':
  //       linkFundTime = 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '11n':
  //       linkFundTime = 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '13d':
  //       linkFundTime = 'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '13n':
  //       linkFundTime = 'https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=800'
  //     break
  //     case '50d':
  //       linkFundTime = 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  //     break
  //     case '50n':
  //       linkFundTime = 'https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  //     break
  //   }

  //   document.body.style = `background: url(${linkFundTime}); background-size: cover; background-repeat: no-repeat; background-position: center center`

  console.log(weather);

  return (
    <div className="App">
      <div className="sub-app">
        <h1>Your clima</h1>
        <p>{weather.sys?.[1]}</p>
        <strong><p>{weather.name}{", "}{weather.sys?.country}</p></strong>
        <div className='container-body'>
          <div className='primer-container-body'>
            <strong><p id='title'>{weather.weather[0]?.description}</p></strong>
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
