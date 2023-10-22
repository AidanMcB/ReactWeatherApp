import React from 'react';

export default function WeatherPage(props) {

    const weather = props.weather

    // Currently unused, to be removed
    // function msToTime(duration) {
    //     const milliseconds = parseInt((duration % 1000) / 100),
    //         seconds = Math.floor((duration / 1000) % 60),
    //         minutes = Math.floor((duration / (1000 * 60)) % 60),
    //         hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    //     hours = (hours < 10) ? "0" + hours : hours;
    //     minutes = (minutes < 10) ? "0" + minutes : minutes;
    //     seconds = (seconds < 10) ? "0" + seconds : seconds;

    //     return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    // }

    function timeConverter(seconds) {
        const date = new Date(seconds * 1000);
        const timestr = date.toLocaleTimeString();
        return timestr
    };

    // dt_txt


    return (
        <div className="weather-info-wrapper">
            <div className="weather-details-grid">
                <div className="grid-cell">
                    <span className="grid-cell--label">City</span>
                    <span className="grid-cell--info">{weather.city}</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Temperature</span>
                    <span className="grid-cell--info">{weather.temperature + " " + String.fromCharCode(176) + "F"}</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Humidity</span>
                    <span className="grid-cell--info">{weather.humidity} %</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Feels Like</span>
                    <span className="grid-cell--info">{weather.feelsLike + " " + String.fromCharCode(176) + "F"}</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Skies</span>
                    <span className="grid-cell--info">{weather.main},<br /> {weather.description}</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Wind Speed</span>
                    <span className="grid-cell--info">{weather.windSpeed} mi/h </span>
                </div>
                <div>
                    <span className="grid-cell--label">Sunrise</span>
                    <span className="grid-cell--info">&emsp;{timeConverter(weather.sunrise)}</span>
                </div>
                <div className="grid-cell">
                    <span className="grid-cell--label">Sunset</span>
                    <span className="grid-cell--info">&emsp;{timeConverter(weather.sunset)}</span>
                </div>
            </div>
        </div>
    );
};