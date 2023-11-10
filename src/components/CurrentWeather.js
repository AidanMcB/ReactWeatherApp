import React from 'react';
import { __kelvinToFahrenheit } from '../utils';

const monthsOfTheYear = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'November',
    10: 'December',
    11: 'January'
};

export default function CurrentWeather(props) {
    const { today, currentWeather, locationData } = props;

    const dateObj = new Date(currentWeather.dt*1000);
    const month = monthsOfTheYear[dateObj.getUTCMonth()];
    const day = dateObj.getUTCDate();

    return(
        <div className="current-day-wrapper">
            <h3 className="city">{locationData.name}</h3>
            <h1 className="temperature">{__kelvinToFahrenheit(currentWeather.temp)}&deg; F</h1>
            <p className="today">{today} {month} {day}</p>
            <p className="hi-low">
                {currentWeather?.weather[0]?.main}, {currentWeather?.weather[0]?.description}
            </p>
        </div>
    );
};