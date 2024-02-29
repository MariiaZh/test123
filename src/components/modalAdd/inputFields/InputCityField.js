import "./InputFields.css";
import citiesList from "../../../utils/citiesList";
import { picturesCities } from "../../../utils/citiesImagesImports";
import defaultPicture from "../../../assets/question-mark_2808193.png";

const InputCityField = ({ onSelectCity, cityName }) => {
    return (
        <div className="cityBlock">
            <div>
                <div className="fieldName">
                    <span>*</span>City
                </div>
                <select
                    className="cities"
                    id="currentCities"
                    onChange={onSelectCity}
                    value={cityName}
                >
                    <option key="empty" value="empty"></option>
                    {citiesList.map((city) => {
                        return (
                            <option key={city.city} value={city.city}>
                                {city.city}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="rightPartCityBlock">
                <img
                    className="imageCityBlock"
                    src={
                        cityName?.length && cityName !== "empty"
                            ? picturesCities[cityName]
                            : defaultPicture
                    }
                />
            </div>
        </div>
    );
};

export default InputCityField;
