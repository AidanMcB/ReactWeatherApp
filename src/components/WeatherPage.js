import React from 'react'

export default function WeatherPage(props) {

    const weather = props.weather

    return (
        console.log(props),
        <div>
            <span class="badge badge-pill badge-primary">City</span>
            <p>{weather.city}</p>
            <span class="badge badge-pill badge-primary">Temperature</span>
            <p>{weather.temperature}</p>
            <span class="badge badge-pill badge-primary">Humidity</span>
            <p>{weather.humidity} %</p>
            <span class="badge badge-pill badge-primary">Feels Like</span>
            <p>{weather.feelsLike}</p>
            <span class="badge badge-pill badge-primary">Skies</span>
            <p>{weather.main}, {weather.description}</p>
            <span class="badge badge-pill badge-primary">Wind Speed</span>
            <p>{weather.windSpeed} m/h </p>

        </div>
    )
}