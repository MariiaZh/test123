import "./WeekWeatherCard.css";
import { icons } from "../../../../utils/iconsImports";

const WeekWeatherCard = ({ day }) => {
    return (
        <div className="weatherWrapper">
            <p className="dayName">{day.dayName}</p>
            <p className="dayName">{day.date}</p>
            <img
                className="dayImage"
                src={`${icons[day.icon] ? icons[day.icon] : icons.default}`}
                title={day.description}
            />
            <p className="temperature">
                {day.tempMax}&#176;/{day.tempMin}&#176;
            </p>
        </div>
    );
};

export default WeekWeatherCard;
