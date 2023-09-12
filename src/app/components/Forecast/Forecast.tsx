import { WeatherData } from 'src/app/models';
import { WEEK_DAYS, kelvinToCelsius } from '../../consts'
import styles from './Forecast.module.css'
import React from 'react';

interface ForecastProps {
    data: WeatherData;
}



export const Forecast: React.FC<ForecastProps> = ({ data }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInWeek)
    );

    console.log(forecastDays)
    return (
        <>
            <label className={styles.title}>Daitly</label>
            {data.list.slice(0, 7).map((item: WeatherData, index: number) => (
                <div key={index} className={styles.daily__item}>
                    <img
                        alt='weather'
                        className={styles.icon__small}
                        src={`/icons/${item.weather[0].icon}.png`}
                    />
                    <label className={styles.day}>{forecastDays[index]}</label>
                    <label className={styles.description}>{item.weather[0].description}</label>
                    <label className={styles.min__max}>
                        {Math.round(item.main.temp_min - kelvinToCelsius)}°C /{' '}
                        {Math.round(item.main.temp_max - kelvinToCelsius)}°C
                    </label>
                </div>
            ))}
        </>
    );
};