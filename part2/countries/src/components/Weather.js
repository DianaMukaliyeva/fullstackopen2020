import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('');

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
            .then(result => setWeather(result.data.current));
    }, [country]);

    return (
        <>
            <h2>Weather in {country}</h2>
            {weather === '' ? (
                <div>Loading</div>
            ) : (
                <>
                    <div>
                        <b>temperature:</b> {weather.temperature} Celcius
                    </div>
                    <img
                        style={{ width: '50px', height: '50px' }}
                        alt={weather.weather_description}
                        src={weather.weather_icons}
                    />
                    <div>
                        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
                    </div>
                </>
            )}
        </>
    );
};

export default Weather;
