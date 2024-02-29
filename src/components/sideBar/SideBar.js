import "./SideBar.css";
import { useSelector } from "react-redux";
import { iconsMonochrome } from "../../utils/iconsImports";
import Timer from "./timer/Timer";
import UserAuth from "./userAuth/UserAuth";

const SideBar = () => {
    const { currentWeather, currentTrip } = useSelector((state) => state.trips);

    return (
        <div className="mainSideBar">
            <UserAuth />
            {currentWeather.city && (
                <div className="sbContentWrapper">
                    <div className="sbWrapper">
                        <h1 className="sbHeader">{currentWeather?.dayName}</h1>
                        <div className="sbIconWrapper">
                            <img src={iconsMonochrome[currentWeather?.icon]} />
                            <h1>
                                {currentWeather?.temp}
                                <sup>&#176;C</sup>
                            </h1>
                        </div>
                        <p className="sbCity">{currentWeather?.city}</p>
                    </div>
                    {currentTrip && <Timer />}
                </div>
            )}
        </div>
    );
};

export default SideBar;
