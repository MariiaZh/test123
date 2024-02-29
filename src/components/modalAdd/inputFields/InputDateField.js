import "./InputFields.css";

const InputDateField = ({
    name,
    fieldName,
    minDate,
    maxDate,
    onChangeDate,
    onFocusDate,
    error,
}) => {
    return (
        <>
            <div className="fieldName">
                <span>*</span>
                {fieldName}
            </div>
            <input
                name={name}
                type="date"
                className={error ? "datePicker error" : "datePicker"}
                locale="en-En"
                min={minDate}
                max={maxDate}
                onChange={onChangeDate}
                pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                onFocus={onFocusDate}
            />
        </>
    );
};

export default InputDateField;
