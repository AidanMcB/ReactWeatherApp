import React from 'react';
import './App.css';
// Reserved for testing purposes
// import forecastData from './defaultForecastData.json';
// import localData from './defaultLocationData.json';

//Components
import Forecast from './components/Forecast';
import TopBar from './components/TopBar';
import Map from './components/Map.js';
import { _getWeatherByLatAndLon, _getCoordinatesByZipAndCountry } from './services';

function App() {
    const defaultZipCodeNYC = '10001';
    const defaultCountryCodeUS = 'US';

    const [errorMessage, setErrorMessage] = React.useState('');
    const [locationData, setLocationData] = React.useState();

    const [forecast, setForecast] = React.useState();
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect(() => {
        init();
    }, []);

    async function init() {
        const cachedZip = localStorage.getItem('zipCode');
        const cachedCountry = localStorage.getItem('countryCode');
        setWeatherData(cachedZip || defaultZipCodeNYC, cachedCountry || defaultCountryCodeUS);
    };

    const handleSubmit = async (e, locationData) => {
        e.preventDefault();
        let { zip, countryCode } = locationData;

        if (!isFormValid(zip, countryCode)) {
            return
        };

        setWeatherData(zip, countryCode);
    };

    async function setWeatherData(zip, countryCode) {
        const getCoordsResponse = await _getCoordinatesByZipAndCountry(zip, countryCode);
        if (!getCoordsResponse.lat || !getCoordsResponse.lon)  {
            setErrorMessage('*Failed to get forecast by latitude and longitude.');
            console.error('Failed to get forecast by latitude and longitude. Response: ', getCoordsResponse);
            return;
        }
        setLocationData(getCoordsResponse);
        const {lat, lon} = getCoordsResponse;
        if (typeof lat !== "number" && typeof lon !== "number") {
            setErrorMessage('*There was an issue fetching the location specified. Please try another Zip Code or Country.');
            console.error('There was an issue fetching the location specified. Please try another Zip Code or Country.');
            return;
        } 

        const weatherInfo = await _getWeatherByLatAndLon(lat, lon);
        if (weatherInfo) {
            setForecast(weatherInfo);
            setErrorMessage('');
            localStorage.setItem('zipCode', zip);
            localStorage.setItem('countryCode', countryCode);
            setFormSubmitted(true);
        } else {
            setErrorMessage(`*Error getting the weather for location at latitude ${lat} and longitude ${lon}.`);
        }
    }

    function isFormValid(zip, countryCode) {
        const numbers = /^[0-9]+$/;
        if (!zip || !zip.toString().match(numbers) || zip.toString().length !== 5) { 
            setErrorMessage('*Unable to find the weather for that zip code. Please be sure to enter a valid 5 digit numeric zip code.');
            return false;
        }
        if (!countryCode || countryCode.length < 1) {
            setErrorMessage('*Invalid Country. Please select a country from the list.');
            return false;
        }
        return true;
    };

    return (
        <div className="App-wrapper">
            <TopBar handleSubmit={handleSubmit} errorMessage={errorMessage} closeFormOnSuccess={formSubmitted} />
            {errorMessage.length > 0 &&
                <div className="error-message-container">
                    <p className="error-message" role="alert">
                        {errorMessage}
                    </p> 
                </div>
            }    
            <div className="App">
                { forecast && locationData &&
                    <Forecast forecast={forecast} locationData={locationData} />
                }
                { locationData &&
                <   Map lat={locationData.lat} lon={locationData.lon} />
                }
            </div>
        </div>
    );
};

export default App;
