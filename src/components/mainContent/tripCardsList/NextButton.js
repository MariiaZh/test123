import "./TripCardsList.css";
import { useDispatch, useSelector } from "react-redux";
import {
    setTrip,
    shiftCardsList,
    updateScroll,
} from "../../../store/tripsSlice";
import {
    getTripWeatherRequest,
    getCityWeatherRequest,
} from "../../../store/API/weatherApi";
import { getRequestDate } from "../../../utils/functions";

const NextButton = ({ name }) => {
    const dispatch = useDispatch();
    const { trips, currentTrip } = useSelector((state) => state.trips);

    const onChangeTrip = () => {
        const currentTripIndex = trips.findIndex(
            (trip) => trip.id == currentTrip
        );
        let nextTrip;

        if (name == "next") {
            if (currentTripIndex < trips.length - 1) {
                nextTrip = trips.find(
                    (_, index) => index == currentTripIndex + 1
                );
                if (!((currentTripIndex + 1) % 4)) {
                    dispatch(shiftCardsList({ status: true, scroll: "down" }));
                }
            } else {
                nextTrip = trips[0];
                dispatch(updateScroll(true));
            }
        } else {
            if (currentTripIndex > 0) {
                nextTrip = trips.find(
                    (_, index) => index == currentTripIndex - 1
                );
                if (!(currentTripIndex % 4)) {
                    dispatch(shiftCardsList({ status: true, scroll: "up" }));
                }
            } else {
                nextTrip = trips[trips.length - 1];
                dispatch(shiftCardsList({ status: true, scroll: "bottom" }));
            }
        }
        dispatch(setTrip(nextTrip.id));
        dispatch(
            getTripWeatherRequest({
                city: nextTrip.city,
                startDate: getRequestDate(nextTrip.startDate),
                endDate: getRequestDate(nextTrip.endDate),
            })
        );
        dispatch(getCityWeatherRequest(nextTrip.city));
    };

    return (
        <input
            type="button"
            disabled={!currentTrip}
            className={currentTrip ? `${name}` : `${name} disabledNext`}
            onClick={onChangeTrip}
        />
    );
};

export default NextButton;
