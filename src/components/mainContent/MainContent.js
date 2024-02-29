import Header from "./header/Header.js";
import TripCardsList from "./tripCardsList/TripCardsList.js";
import WeekWeather from "./weekWeatherList/WeekWeatherList.js";
import "./MainContent.css";

const MainContent = () => {
    return (
        <div className="mainContent">
            <Header />
            <TripCardsList />
            <WeekWeather />
        </div>
    );
};

export default MainContent;
