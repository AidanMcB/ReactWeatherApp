import { __kelvinToFahrenheit } from '../utils.js';
import SelectedDayDisplay from './CurrentWeather.js';
import React from 'react';
import WeatherModal from './WeatherModal.js';

const daysOfTheWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

function getDayOfTheWeek(dateTime) {
    const date = new Date(dateTime*1000);
    // Mon Jun 15 2020 17:07:59 GMT-0700
    return daysOfTheWeek[date.getDay()];
};

export default function Forecast(props) {
    const { forecast, locationData } = props;
    
    const today = new Date();
    const [activeDay, setActiveDay] = React.useState(getDayOfTheWeek(today.getMilliseconds()));
    const [isModalOpen, setModalOpen] = React.useState(false);
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    };

    function handleDaySelect(dayOfTheWeek) {
        setActiveDay(dayOfTheWeek);
        setModalOpen(true);
    }

    const sevenDays = forecast.daily.slice(0,7);
  
    return (
        <div className="forecast-wrapper">
            <SelectedDayDisplay today={getDayOfTheWeek(forecast.current.dt)} currentWeather={forecast.current} locationData={locationData} /> 
            <WeatherModal activeDay={activeDay} predictiveData={forecast.daily[getKeyByValue(daysOfTheWeek, activeDay)]} isActive={isModalOpen} closeModal={() => setModalOpen(false)} />
            <div className="weekly-forecast-wrapper">
                <div className="weekly-forecast-wheel">
                    { sevenDays.map((day) => (
                        <DayCard day={day} 
                            activeDay={activeDay} 
                            selectDay={handleDaySelect}
                            key={day.dt}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};

function DayCard(props) {

    const { day, activeDay, selectDay } = props;
    const dayOfTheWeek = getDayOfTheWeek(day.dt);

    return(
        <div className={"day-card" + (activeDay === dayOfTheWeek ? " active" : " ")} onClick={() => selectDay(dayOfTheWeek)}>
            <span className="day">{ dayOfTheWeek }</span>
            <span className="temp">{ __kelvinToFahrenheit(day.temp.day) }&deg; F</span>
        </div>
    );
};