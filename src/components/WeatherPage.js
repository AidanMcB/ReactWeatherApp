import React from 'react';
import '../App.css';

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


    return (
        <div style={{ backgroundRepeat: "cover", height: "100%",
            color:"white",
            marginLeft:"30px",
            marginRight:"30px",
            textShadow:"1px 1px black" }}
        >
            <div 
                className="d-flex justify-content-around"
                style={{
                    background:"rgba(0,0,0,0.10)",
                    borderRadius:"45px"
                }}
            >
                <div style={{margin:"20px"}} className="flex-column align-items-center">
                    <div>
                        <h4><span className="badge badge-pill badge-primary">City</span></h4>
                        <h2><p>{weather.city}</p></h2>
                    </div>
                    <div style={{marginTop:"20%", marginBottom:"20%" }}>
                        <h4><span className="badge badge-pill badge-primary">Temperature</span></h4>
                        <h2><p>{weather.temperature + " " + String.fromCharCode(176) + "F"}</p></h2>
                    </div>
                    <div>
                        <h4><span className="badge badge-pill badge-primary">Humidity</span></h4>
                        <h2><p>{weather.humidity} %</p></h2>
                    </div>
                </div>
                <div style={{margin:"20px"}} className="flex-column justify-content-around">
                <div>
                    <h4><span className="badge badge-pill badge-primary">Feels Like</span></h4>
                    <h2><p>{weather.feelsLike + " " + String.fromCharCode(176) + "F"}</p></h2>
                </div>
                <div style={{marginTop:"20%", marginBottom:"20%" }}>
                    <h4><span className="badge badge-pill badge-primary">Skies</span></h4>
                    <h2><p>{weather.main},<br /> {weather.description}</p></h2>
                </div>
                <div>
                    <h4><span className="badge badge-pill badge-primary">Wind Speed</span></h4>
                    <h2><p>{weather.windSpeed} mi/h </p></h2>
                </div>
                </div>
                <div style={{margin:"20px"}} className="flex-column justify-content-around" >
                    <div>
                        <h4><span className="badge badge-pill badge-primary">Sunrise</span></h4>
                        <h2><p>&emsp;{timeConverter(weather.sunrise)}</p></h2>
                    </div>
                    <div style={{marginTop:"20%"}}>
                        <h4><span className="badge badge-pill badge-primary">Sunset</span></h4>
                        <h2><p>&emsp;{timeConverter(weather.sunset)}</p></h2>
                    </div>
                </div>
            </div>
        </div>
    );
};