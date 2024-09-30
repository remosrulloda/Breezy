import React, { useRef, useState } from 'react'
import './Weather.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind'
import { faWater } from '@fortawesome/free-solid-svg-icons'

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import mist_icon from '../assets/mist.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import thunderstorm_icon from '../assets/thunderstorm.png';

const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "clear sky": clear_icon,
        "few clouds": cloud_icon,
        "scattered clouds": cloud_icon,
        "broken clouds": cloud_icon,
        "shower rain": rain_icon,
        "rain": rain_icon,
        "thunderstorm": thunderstorm_icon,
        "snow": snow_icon,
        "mist": mist_icon
    }

    const search = async (cityName) => {
        if (cityName === '') {
            alert('Enter a city name');
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].description] || clear_icon;

            console.log(data.weather[0].description);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data");
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search(inputRef.current.value);
        }
    }


    return (
        <div className="weather">
            <div className="search-bar">
                <i><FontAwesomeIcon icon={faLocationDot} size="lg" /></i>
                <input ref={inputRef} type="text" className="search" placeholder='Enter your location' autoFocus onKeyDown={handleKeyDown} />
                <i className="search-icon" onClick={() => search(inputRef.current.value)}><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
            </div>
            {weatherData ? <>
                <div className="weather-box">
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°F</p>
                    <p className='location'>{weatherData.location}</p>
                </div>
                <div className="weather-details">
                    <div className="humidity">
                        <i><FontAwesomeIcon icon={faWater} size="lg" /></i>
                        <div className="text">
                            <span>{weatherData.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="wind">
                        <i><FontAwesomeIcon icon={faWind} size="lg" /></i>
                        <div className="text">
                            <span>{weatherData.windSpeed} mph</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </> : <></>}
        </div>
    )
}

export default Weather
