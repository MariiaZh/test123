export const getDisplayDate = (data) => {
    const currentDate = new Date(data);
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    return `${date >= 10 ? date : "0" + date}.${
        month >= 10 ? month : "0" + month
    }.${currentDate.getFullYear()}`;
};

export const getRequestDate = (data) => {
    const currentDate = new Date(data);
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    return `${currentDate.getFullYear()}-${month >= 10 ? month : "0" + month}-${
        date >= 10 ? date : "0" + date
    }`;
};

export const validateDisable = (cityName, valueStart, valueEnd) => {
    let d =
        !cityName?.length ||
        cityName == "empty" ||
        valueStart === "" ||
        valueStart == NaN ||
        valueEnd === "" ||
        valueEnd == NaN;

    return (
        !cityName?.length ||
        cityName == "empty" ||
        valueStart === "" ||
        isNaN(valueStart) ||
        valueEnd === "" ||
        isNaN(valueEnd)
    );
};

export const validateForm = (
    cityName,
    valueStart,
    valueEnd,
    futureStamp,
    today
) => {
    let isValid = "straight";
    let error = "";
    let errorInputId = "";

    const yesterday = today.setDate(today.getDate() - 1);

    if (!cityName.length || cityName == "empty") {
        isValid = false;
        error = "Choose the city from the list!";
        errorInputId = "currentCities";
    } else if (
        valueStart === "" ||
        valueStart === NaN ||
        valueStart < yesterday
    ) {
        isValid = false;
        error = "Start date must be no later than today!";
        errorInputId = "startDate";
    } else if (valueEnd === "" || valueEnd === NaN || valueEnd > futureStamp) {
        isValid = false;
        error = `End date must be no later than ${getDisplayDate(futureStamp)}`;
        errorInputId = "endDate";
    }

    if (valueStart > valueEnd) {
        isValid = "reverse";
    }

    return { isValid, error, errorInputId };
};
