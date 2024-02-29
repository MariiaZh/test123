import "./AddCard.css";
import { useDispatch } from "react-redux";
import { modalUse } from "../../../../store/tripsSlice";

const AddCard = () => {
    const dispatch = useDispatch();

    const addNewTrip = () => {
        dispatch(modalUse({ name: "modalActive", value: true }));
    };
    return (
        <div className="addCard tripArray">
            <div className="addWrapper" onClick={addNewTrip}>
                <h3>Add trip</h3>
            </div>
        </div>
    );
};

export default AddCard;
