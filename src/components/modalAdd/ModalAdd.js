import "./ModalAdd.css";
import InputCityField from "./inputFields/InputCityField";
import InputDateField from "./inputFields/InputDateField";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalUse, addTrip, sortList } from "../../store/tripsSlice";
import { picturesCities } from "../../utils/citiesImagesImports";

import {
    getRequestDate,
    validateForm,
    validateDisable,
} from "../../utils/functions";

const ModalAdd = () => {
    const dispatch = useDispatch();
    const modalActive = useSelector((state) => state.trips.modalActive);
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + 14);

    const todayStamp = today.getTime();
    const futureStamp = future.getTime();

    const [valueStart, setValueStart] = useState("");
    const [valueEnd, setValueEnd] = useState("");
    const [cityName, setCityName] = useState("");
    const [isDisabled, setIsDisabled] = useState(
        validateDisable(cityName, valueStart, valueEnd)
    );
    const [formError, setFormError] = useState({
        error: "",
        errorInputId: "",
    });

    const onCloseModal = () => {
        dispatch(modalUse({ name: "modalActive", value: false }));
        setValueStart("");
        setValueEnd("");
        setCityName("");
        setFormError({
            error: "",
            errorInputId: null,
        });
    };

    const onSelectCity = (e) => {
        setCityName(e.target.value);
        setFormError({
            error: "",
            errorInputId: null,
        });
        setIsDisabled(validateDisable(e.target.value, valueStart, valueEnd));
    };

    const onChangeDate = (e) => {
        if (e.target.name == "startDate") {
            setValueStart(e.target.valueAsNumber);
            setIsDisabled(
                validateDisable(cityName, e.target.valueAsNumber, valueEnd)
            );
        } else {
            setValueEnd(e.target.valueAsNumber);
            setIsDisabled(
                validateDisable(cityName, valueStart, e.target.valueAsNumber)
            );
        }
    };

    const onFocusDate = (e) => {
        setFormError({
            error: "",
            errorInputId: null,
        });
    };

    const onSubmitForm = (e) => {
        const validation = validateForm(
            cityName,
            valueStart,
            valueEnd,
            futureStamp,
            today
        );

        if (validation.isValid) {
            dispatch(
                addTrip({
                    id: new Date().getTime(),
                    new: true,
                    city: cityName,
                    picture: picturesCities[cityName],
                    startDate:
                        validation.isValid == "straight"
                            ? valueStart
                            : valueEnd,
                    endDate:
                        validation.isValid == "straight"
                            ? valueEnd
                            : valueStart,
                })
            );
            dispatch(sortList(""));
            setValueStart("");
            setValueEnd("");
            setCityName("");
        } else {
            setFormError({
                error: validation.error,
                errorInputId: validation.errorInputId,
            });
        }
    };

    if (modalActive) {
        return (
            <div className="modal modalActive">
                <form className="form">
                    <div className="blockHeaderWrapper">
                        <h3 className="formHeader">Create trip</h3>
                        <input
                            className="closeButton"
                            type="button"
                            onClick={onCloseModal}
                        />
                    </div>
                    <div className="blockContentWrapper">
                        <InputCityField
                            onSelectCity={onSelectCity}
                            cityName={cityName}
                            error={formError.errorInputId == "cityName"}
                        />
                        <InputDateField
                            name="startDate"
                            fieldName="Start date"
                            minDate={getRequestDate(todayStamp)}
                            maxDate={getRequestDate(futureStamp)}
                            valueAsNumber={valueStart}
                            onChangeDate={onChangeDate}
                            onFocusDate={onFocusDate}
                            error={formError.errorInputId == "startDate"}
                        />
                        <InputDateField
                            name="endDate"
                            fieldName="End date"
                            minDate={
                                valueStart
                                    ? getRequestDate(valueStart)
                                    : getRequestDate(todayStamp)
                            }
                            maxDate={getRequestDate(futureStamp)}
                            valueAsNumber={valueEnd}
                            onChangeDate={onChangeDate}
                            onFocusDate={onFocusDate}
                            error={formError.errorInputId == "endDate"}
                        />
                    </div>
                    <div className="blockFooterWrapper">
                        <input
                            className="cancelButton"
                            type="button"
                            value="Cancel"
                            onClick={onCloseModal}
                        />
                        <input
                            className={
                                isDisabled
                                    ? "saveButton disabled"
                                    : "saveButton"
                            }
                            type="button"
                            value="Save"
                            disabled={isDisabled}
                            onClick={onSubmitForm}
                        />
                    </div>
                </form>
                <p
                    className={
                        formError.errorInputId ? "hintMsg" : "hintMsg hidden"
                    }
                >
                    {formError.error}
                </p>
            </div>
        );
    } else {
        return <></>;
    }
};

export default ModalAdd;
