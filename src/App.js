import React, { useState } from 'react';
import './App.css';

//Components
import LandinPage from './components/LandinPage'
import WeatherPage from './components/WeatherPage'
import Watch from './components/Watch'
//Images
import BGimage from './images/jeremy-thomas.jpg'

function App() {

  const [show, setShow] = useState(false)
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
    if (zipCode.length === 5 && zipCode.match(numbers)) {
      console.log("success")

      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`)
        .then(resp => resp.json())
        .then(weather => {
          console.log("this:", weather.cod)
          if (weather.cod !== "404") {
            setShow(false)
            setWeather({
              //farenheit
              city: weather.name,
              temperature: Math.round(weather.main.temp * 10) / 10,
              humidity: weather.main.humidity,
              feelsLike: Math.round(weather.main.feels_like * 10) / 10,
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
          }
        })
    } else {
      console.log("invalid input")
      setShow(true)
      setWeather({ city: "" })
    }
  }

  return (
    <div className="App">
      <div class="heading" >
        <br />
        <h1 style={{
          fontSize: "58px",
          color: "white",
          textShadow: "1.5px 1.5px black",
          backgroundColor: "rgba(0,0,0,0.10)",
          borderRadius: "25px",
          width: "40%",
          margin: "auto",
          border: "1px solid black"
        }}>Weather App</h1>
      </div>
      <LandinPage handleSubmit={handleSubmit} />
      <Watch />
      {show ?
        <div style={{ display: "inline-block", borderRadius: "25px" }} class="alert alert-danger" role="alert">Please Enter a 5 Digit Numeric Zip Code!</div> : null}
      {weather.city !== "" ? <WeatherPage weather={weather} /> : null}
    </div>
  );
}

export default App;
