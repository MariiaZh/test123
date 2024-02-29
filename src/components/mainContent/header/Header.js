import "./Header.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCity, stopSearchCity } from "../../../store/tripsSlice";
import SortButton from "./SortButton";
import { deleteTrip, modalUse } from "../../../store/tripsSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { currentTrip, trips } = useSelector((state) => state.trips);
    const [inputText, setInputText] = useState("");
    const onChangeText = (e) => {
        setInputText(e.target.value);
        if (e.target.value.length >= 2) {
            dispatch(searchCity(e.target.value));
        }
        if (e.target.value.length == 0) {
            dispatch(stopSearchCity());
        }
    };

    const addNewTrip = () => {
        dispatch(modalUse({ name: "modalActive", value: true }));
    };

    const onDelete = () => {
        dispatch(deleteTrip(currentTrip));
    };

    return (
        <header className="header">
            <h1 className="headerText">
                Weather <b>Forecast</b>
            </h1>
            <div className="headerWrapper">
                <input
                    className="input"
                    placeholder="Search your trip"
                    value={inputText}
                    onChange={onChangeText}
                />
                <p className="headerSortTitle">Sort by</p>
                <div className="headerBtns">
                    <SortButton name="Added" />
                    <SortButton name="Name" />
                    <SortButton name="Start date" />
                </div>
                <input className="addBtn" type="button" onClick={addNewTrip} />
                <input
                    className={`deleteBtn ${
                        currentTrip ? "" : "deleteDisable"
                    }`}
                    type="button"
                    onClick={onDelete}
                    disabled={!currentTrip}
                />
            </div>
        </header>
    );
};

export default Header;
