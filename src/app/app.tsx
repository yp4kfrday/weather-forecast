// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import styles from './app.module.css';
import { CurrentWeather, Search } from './components';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';


const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData: { value: { split: (arg0: string) => [string, string]; }; label: string; }) => {
    const [lat, lon] = searchData.value.split('');

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&lang=ru&appid=${WEATHER_API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&lang=ru&appid=${WEATHER_API_KEY}`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((err) => console.log(err))
  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className={styles.container}>
      <Search onSearchChange={handleOnSearchChange} searchData={null} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
