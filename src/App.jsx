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

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>6</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">3</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">74%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">2M/S</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
