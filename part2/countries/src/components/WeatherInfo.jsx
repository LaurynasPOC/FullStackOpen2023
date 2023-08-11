import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ item }) => {
  const [weatherData, setWeatherData] = useState([]);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${item.capital[0]}&appid=${apiKey}&units=metric`
      )
      .then((resp) => setWeatherData(resp.data))
      .catch((err) => console.log(err, "error while fetching weather data"));
  }, [item]);

  return (
    <div>
      {weatherData.length === 0 ? (
        "Loading"
      ) : (
        <div>
          <p>
            <strong>Weather in {weatherData.name}</strong>
          </p>
          <p>temperature {weatherData.main.temp} celcius</p>
          <img
            width="80px"
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
          <div>wind {weatherData.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
