import React from 'react';
import './App.css';

//Components
import LandinPage from './components/LandinPage';
import WeatherPage from './components/WeatherPage';
import WatchClass from './components/WatchClass';

function App() {

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const defaultZipCodeNYC = '10001';

    console.log('Env: ', process.env.NODE_ENV);

    const [errorMessage, setErrorMessage] = React.useState('');
    const [weather, setWeather] = React.useState({
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
        // % clouds
        cloudy: '',
        main: '',
        description: '',
        city: ''
    });

    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect(() => {
        init();
    }, []);

    async function init() {
        const weather = await getWeatherByZipCode(defaultZipCodeNYC);
        if (weather) {
            parseWeatherDataToState(weather);
        }
    }

    async function getWeatherByZipCode(zipCode) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${weatherApiKey}`)
        .then(resp => resp.json())
        .then(weather => {
            if (weather.cod !== "404") {
                return weather;
            }
        })
        .catch((err) => {
            console.error('Failed to get the weather from api.openweathermap.org. Error Message: ', err);
        });
    }

    const handleSubmit = async (e, zipCode) => {
        e.preventDefault()
        const numbers = /^[0-9]+$/;
        if (zipCode.length === 5 && zipCode.match(numbers)) {
            const weather = await getWeatherByZipCode(zipCode);
            if (weather) {
                setErrorMessage('');
                parseWeatherDataToState(weather);
            } else {
                setErrorMessage('Unable to find the weather for that zip code. Please be sure to enter a valid 5 digit numeric zip code');
            }
        } else {
            setErrorMessage('Unable to find the weather for that zip code. Please be sure to enter a valid 5 digit numeric zip code');
        }
    }

    function parseWeatherDataToState(weatherData) {
        setWeather({
            //farenheit
            city: weatherData.name,
            temperature: Math.round(weatherData.main.temp * 10) / 10,
            humidity: weatherData.main.humidity,
            feelsLike: Math.round(weatherData.main.feels_like * 10) / 10,
            windSpeed: weatherData.wind.speed,
            windDirection: weatherData.wind.deg,
            //in milliseconds
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset,
            //visibility in meters
            visibility: weatherData.visibility,
            cloudy: weatherData.clouds.all,
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description
        })
    }

    return (
        <div className="App">
            <div className="heading" >
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
                }}>
                    Weather App
                </h1>
            </div>
            <LandinPage handleSubmit={handleSubmit} />
            <WatchClass />
            {errorMessage.length > 0 &&
                <div style={{ display: "inline-block", borderRadius: "25px" }} className="alert alert-danger" role="alert">
                    {errorMessage}
                </div> 
            }
            {
                ( weather && weather.city !== "") ? 
                    <WeatherPage weather={weather} /> 
                : 
                    <span>What's the weather like?</span>
            }
        </div>
    );
};

export default App;
