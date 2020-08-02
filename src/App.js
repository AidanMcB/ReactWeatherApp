import React, { useState } from 'react';
import './App.css';

//Components
import LandinPage from './components/LandinPage'
import WeatherPage from './components/WeatherPage'

function App() {

  const [weather, setWeather] = useState({
    //farenheit
    temperature: '',
    humidity: '',
    feelsLike: '',
    windSpeed: '',
    windDirection: '',
    //in milliseconds
    sunrise: '',
    sunset: '',
    //visibility in meters
    visibility: '',
    //perc clouds
    cloudy: '',
    main: '',
    description: '',
    city: ''
  })

  //fetch to weather API
  const handleSubmit = (e, zipCode) => {
    e.preventDefault()
    const apiKey = `03b80556af981e9f9a6a57906ecf2438`
    console.log(zipCode)
    const numbers = /^[0-9]+$/
    if(zipCode.length === 5 && zipCode.match(numbers)){
      console.log("success")
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`)
      .then(resp => resp.json())
      .then(weather => {
        setWeather({
            //farenheit
            city: weather.name,
            temperature: weather.main.temp,
            humidity: weather.main.humidity,
            feelsLike: weather.main.feels_like,
            windSpeed: weather.wind.speed,
            windDirection: weather.wind.deg,
            //in milliseconds
            sunrise: weather.sys.sunrise,
            sunset: weather.sys.sunset,
            //visibility in meters
            visibility: weather.visibility,
            cloudy: weather.clouds.all,
            main: weather.weather[0].main,
            description: weather.weather[0].description
        })
      })
    }else{
      console.log("invalid input")

      }
  }

  return (
    <div className="App">
      Weather App
      <LandinPage handleSubmit={handleSubmit} />
      {weather.city !== "" ? <WeatherPage weather={weather} /> : null }
    </div>
  );
}

export default App;
