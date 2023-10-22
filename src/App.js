import React from 'react';
import './App.css';

//Components
import LocationForm from './components/LocationForm';
import WeatherPage from './components/WeatherPage';
import WatchClass from './components/WatchClass';

function App() {

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const defaultZipCodeNYC = '10001';

    // console.log('Env: ', process.env.NODE_ENV);

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

    const [forecast, setForecst] = React.useState();

    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect(() => {
        // init();
    }, []);

    async function init() {
        const weather = await _getWeatherByZipCode(defaultZipCodeNYC);
        if (weather) {
            parseWeatherDataToState(weather);
        }
    }

    async function _getWeatherByLatAndLon(lat, lon) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`)
            .then(resp => resp.json())
            .then(response => {
                if (response.current && response.daily) {
                    return response;
                } else {
                    console.error('Failed to get forecast by lattitude and longitude. Response: ', response);
                }
            })
            .catch((err) => {
                console.error('Failed to get forecast by lattitude and longitude. Error: ', err);
            });
    }

    async function _getWeatherByZipCode(zipCode) {
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

    async function _getCoordiantesByZipAndCountry(zip, countryCode) {
        return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${weatherApiKey}`)
            .then(resp => resp.json())
            .then(response => response)
            .catch((err) => {
                console.error('Problem getting location from api.openweathermap.org. Error: ', err)
            })
    }

    const handleSubmit = async (e, locationData) => {
        e.preventDefault();
        let { zip, countryCode } = locationData;

        if (!isFormValid()) return;

        const getCoordsResponse = await _getCoordiantesByZipAndCountry(zip, countryCode);
        if (!getCoordsResponse.lat || !getCoordsResponse.lon)  {
            console.error('Failed to get forecast by lattitude and longitude. Response: ', getCoordsResponse);
            return;
        }

        const {lat, lon} = getCoordsResponse;
        if (typeof lat !== "number" && typeof lon !== "number") {
            console.error('There was an issue fetching the location specified. Please try another Zip Code or Country.');
            return;
        } 
        
        const weatherInfo = await _getWeatherByLatAndLon(lat, lon);
        if (weatherInfo) {
            setForecst(weatherInfo);
        }
    }

    function isFormValid(zip, countryCode) {
        const numbers = /^[0-9]+$/;
        if (!zip || zip.length !== 5 || !zip.match(numbers)) { 
            setErrorMessage('Unable to find the weather for that zip code. Please be sure to enter a valid 5 digit numeric zip code.');
            return false;
        }
        if (!countryCode || countryCode.lenth < 1) {
            setErrorMessage('Invalid Country. Please select a country from the list.');
            return false;
        }
        return true;
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
            <h1 className="title-1">
                React Weather App
            </h1>
            {/* <button onClick={_getSevenDayForecast()}>try</button> */}
            <LocationForm handleSubmit={handleSubmit} errorMessage={errorMessage}/>
            <WatchClass />
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
