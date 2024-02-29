import "./Timer.css";

const TimerSlot = ({ value, name }) => {
    return (
        <div className="timerSlot">
            <h1>{value}</h1>
            <h2>{name}</h2>
        </div>
    );
};
export default TimerSlot;
