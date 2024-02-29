import "./TripCard.css";
import { useState, useEffect } from "react";
import { getDisplayDate, getRequestDate } from "../../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { setTrip, clearNew } from "../../../../store/tripsSlice";
import {
    getTripWeatherRequest,
    getCityWeatherRequest,
} from "../../../../store/API/weatherApi";

const TripCard = ({ card }) => {
    const dispatch = useDispatch();
    const { currentTrip, newTripId } = useSelector((state) => state.trips);
    const [seconds, setSeconds] = useState(
        newTripId && newTripId == card.id ? 10 : 0
    );

    const onSetTrip = (e) => {
        if (currentTrip != card.id) {
            dispatch(setTrip(card.id));
            dispatch(
                getTripWeatherRequest({
                    city: card.city,
                    startDate: getRequestDate(card.startDate),
                    endDate: getRequestDate(card.endDate),
                })
            );
            dispatch(getCityWeatherRequest(card.city));
        }
    };

    useEffect(() => {
        if (seconds === 0) {
            dispatch(clearNew());
        }
        if (newTripId && newTripId == card.id) {
            const timerId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [seconds]);

    let cardClasses =
        currentTrip == card.id ? "tripArray checkedCard" : "tripArray tripCard";

    if (newTripId && newTripId == card.id)
        cardClasses = cardClasses.concat(" newTrip");

    const imageClasses =
        currentTrip == card.id ? "checkedImage" : "imageWrapper";

    return (
        <div className={cardClasses} onClick={onSetTrip}>
            <div className={imageClasses}>
                <img src={card.picture} />
            </div>
            <p className="city">{card.city}</p>
            <p className="date">
                {`${getDisplayDate(card.startDate)} - ${getDisplayDate(
                    card.endDate
                )}`}
            </p>
        </div>
    );
};

export default TripCard;
