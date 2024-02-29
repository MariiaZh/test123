import "./WeekWeatherList.css";
import WeekWeatherCard from "./weekWeatherCard/WeekWeatherCard";
import { useSelector } from "react-redux";

const WeekWeatherList = () => {
    const tripWeather = useSelector((state) => state.trips.tripWeather);
    if (tripWeather?.length) {
        return (
            <>
                <h3 className="week">Week</h3>
                <div className="cardsWrapper">
                    {tripWeather.map((day) => {
                        return <WeekWeatherCard key={day.date} day={day} />;
                    })}
                </div>
            </>
        );
    } else {
        return (
            <>
                <h3 className="week">Week</h3>
                <p className="emptyText">select a trip to check the weather</p>
            </>
        );
    }
};

export default WeekWeatherList;
