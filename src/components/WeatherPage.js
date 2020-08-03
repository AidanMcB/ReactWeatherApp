import React from 'react'
import '../App.css';
export default function WeatherPage(props) {

    const weather = props.weather

    function msToTime(duration) {
        const milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
    // console.log(msToTime(300000))
    function timeConverter(seconds) {
        const date = new Date(seconds * 1000);
        const timestr = date.toLocaleTimeString();
        //console.log(timestr)
        return timestr
    }


    return (
        console.log(props),
        <div style={{ backgroundRepeat: "cover", height: "100%",
        color:"white",
        textShadow:"1px 1px black" }}>
        <div style={{
            background:"rgba(0,0,0,0.10)",
            borderRadius:"45px"
        }}>
            <div style={{marginTop:"40px"}}
            class="d-flex justify-content-around">
                <div>
                    <h4><span class="badge badge-pill badge-primary">City</span></h4>
                    <h2><p>{weather.city}</p></h2>
                </div>
                <div>
                    <h4><span class="badge badge-pill badge-primary">Temperature</span></h4>
                    <h2><p>{weather.temperature + " " + String.fromCharCode(176) + "F"}</p></h2>
                </div>
                <div>
                    <h4><span class="badge badge-pill badge-primary">Humidity</span></h4>
                    <h2><p>{weather.humidity} %</p></h2>
                </div>
            </div>
            <div style={{marginTop:"40px"}}
            class="d-flex justify-content-around">
                <div>
                    <h4><span class="badge badge-pill badge-primary">Feels Like</span></h4>
                    <h2><p>{weather.feelsLike + " " + String.fromCharCode(176) + "F"}</p></h2>
                </div>
                <div>
                    <h4><span class="badge badge-pill badge-primary">Skies</span></h4>
                    <h2><p>{weather.main}, {weather.description}</p></h2>
                </div>
                <div>
                    <h4><span class="badge badge-pill badge-primary">Wind Speed</span></h4>
                    <h2><p>{weather.windSpeed} mi/h </p></h2>
                </div>
            </div>
            <div style={{marginTop:"40px"}}
            class="d-flex justify-content-around" >
                <div>
                    <h4><span class="badge badge-pill badge-primary">Sunrise</span></h4>
                    <h2><p>&emsp;{timeConverter(weather.sunrise)}</p></h2>
                </div>
                <div>
                    <h4><span class="badge badge-pill badge-primary">Sunset</span></h4>
                    <h2><p>&emsp;{timeConverter(weather.sunset)}</p></h2>
                </div>
            </div>
            </div>
        </div>
    )
}