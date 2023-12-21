import React, { useState } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c50295e21580a0a13559bcd49fe7f307`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      setLocation('');
    }
  };

  const convertKelvinToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9/5 + 32;
  };

  const renderWeather = () => {
    if (!data.main) {
      return null;
    }

    return (
      <div className="container">
        <div className="top">
          <div className="location">
            <h5>{data.name}</h5>
          </div>
          <div className="temp">
            <h1>{convertKelvinToFahrenheit(data.main.temp).toFixed(2)}°F</h1>
          </div>
          <div className="description">
            <p>{data.weather && data.weather[0].description}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{convertKelvinToFahrenheit(data.main.feels_like).toFixed(2)}°F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main && data.main.humidity}</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind && data.wind.speed} M/S</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {renderWeather()}
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
    </div>
  );
}

export default App;
