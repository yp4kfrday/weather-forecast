import { WeatherData } from 'src/app/models';
import styles from './CurrentWeather.module.css'

interface CurrentWeatherProps {
    data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {

    return (
        <div className={styles.weather}>
            <div className={styles.top}>
                <div>
                    <p className={styles.city}>{data.city}</p>
                    <p className={styles.weather__description}>{data.weather[0].description}</p>
                </div>
                <img alt='weather' className={styles.weather__icon} src={`/icons/${data.weather[0].icon}.png`}></img>
            </div>
            <div className={styles.bottom}>
                <p className={styles.temperature}>{Math.round(data.main.temp)}°C</p>
                <div className={styles.details}>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>Детали:</span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>Ощущается как:  </span>
                        <span className={styles.parameter__value}>{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>Ветер:  </span>
                        <span className={styles.parameter__value}>{data.wind.speed}</span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>Влажность: </span>
                        <span className={styles.parameter__value}>{data.main.humidity}</span>
                    </div>
                    <div className={styles.parameter__row}>
                        <span className={styles.parameter__label}>Давление: </span>
                        <span className={styles.parameter__value}>{data.main.pressure}hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}