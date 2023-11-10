import React from 'react';
import { __kelvinToFahrenheit } from '../utils';

export default function WeatherModal(props) {

    const { activeDay, predictiveData, isActive, closeModal } = props;
    const [weatherIcon, setWeatherIcon] = React.useState();

    const fetchImage = async () => {
        const res = await fetch(`https://openweathermap.org/img/wn/${predictiveData?.weather[0]?.icon}.png`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setWeatherIcon(imageObjectURL);
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect( () => {
        fetchImage();
    }, []);

    return(
        <div className={"weather-modal-wrapper " + (isActive ? " active" : "")}>
            <div className="weather-modal">
                <button className="modal--close-button" onClick={() => closeModal(null)}>X</button>
                <span className="modal--active-day">{ activeDay }</span>
                <div className="modal--main">
                    <span className="modal--temp">{__kelvinToFahrenheit(predictiveData.temp.day)}&deg; F</span>
                    <span className="modal--icon">
                        <img src={weatherIcon} alt="icons" />
                    </span>
                </div>
                <div className="modal--grid">
                    <span className="modal--grid-row modal--weather-description">{predictiveData?.weather[0]?.main}, {predictiveData?.weather[0]?.description}</span>
                    <span className="modal--grid-row modal--temp-hi"><label>Hi</label> {__kelvinToFahrenheit(predictiveData.temp.max)}&deg; F </span>
                    <span className="modal--grid-row modal--temp-low"><label>Low</label> {__kelvinToFahrenheit(predictiveData.temp.min)}&deg; F</span>
                    <span className="modal--grid-row modal--humidity"><label>Humidity</label> {predictiveData.humidity} % </span>
                </div>
            </div>
        </div>
    );
};