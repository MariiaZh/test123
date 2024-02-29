import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { sortList } from "../../../store/tripsSlice";

const SortButton = ({ name }) => {
    const dispatch = useDispatch();
    const { sorted } = useSelector((state) => state.trips);

    const onSort = () => {
        if (sorted != name) {
            dispatch(sortList(name));
        }
    };
    return (
        <input
            type="button"
            className={sorted == name ? "sort activeSort" : "sort"}
            value={name}
            onClick={onSort}
        />
    );
};

export default SortButton;
