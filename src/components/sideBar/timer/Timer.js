import "./Timer.css";

import { useSelector } from "react-redux";
import { useCountdown } from "../../../hooks/useCountdown";
import TimerSlot from "./TimerSlot";

const Timer = () => {
    const { trips, currentTrip: tripId } = useSelector((state) => state.trips);
    const currentTrip = trips.find((trip) => trip.id == tripId);

    const [days, hours, minutes, seconds] = useCountdown(currentTrip.startDate);

    return (
        <div className="timerWrapper">
            <TimerSlot value={days} name={"days"} />
            <TimerSlot value={hours} name={"hours"} />
            <TimerSlot value={minutes} name={"minutes"} />
            <TimerSlot value={seconds} name={"seconds"} />
        </div>
    );
};

export default Timer;
