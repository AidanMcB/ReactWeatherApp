const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export async function _getIcon(iconCode) {
    return fetch(`https://openweathermap.org/img/wn/${iconCode}.png`)
        .then(resp => resp.json())
        .then(response => response)
        .catch((err) => {
            console.error('Failed to get weather icon. Error: ', err);
        });
}

export async function _getWeatherByLatAndLon(lat, lon) {
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
};

export async function _getWeatherByZipCode(zipCode) {
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
};

export async function _getCoordinatesByZipAndCountry(zip, countryCode) {
    return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${weatherApiKey}`)
        .then(resp => resp.json())
        .then(response => response)
        .catch((err) => {
            console.error('Problem getting location from api.openweathermap.org. Error: ', err)
        })
};