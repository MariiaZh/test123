import "./TripCardsList.css";
import TripCard from "./tripCard/TripCard.js";
import AddCard from "./addCard/AddCard";
import NextButton from "./NextButton";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScroll, shiftCardsList } from "../../../store/tripsSlice";

const TripCardsList = () => {
    const dispatch = useDispatch();
    const { trips, scrollToTop, scrollToBottom } = useSelector(
        (state) => state.trips
    );

    const containerRef = useRef(null);

    useEffect(() => {
        if (scrollToTop) {
            containerRef.current.scrollTop = 0;
            dispatch(updateScroll(false));
        }
        if (scrollToBottom.status) {
            let heightValue =
                containerRef.current.children[0].offsetHeight + 20;
            switch (scrollToBottom.scroll) {
                case "up":
                    containerRef.current.scrollTop -= heightValue;
                    break;
                case "down":
                    containerRef.current.scrollTop += heightValue;
                    break;
                case "bottom":
                    containerRef.current.scrollTop =
                        (Math.ceil(trips.length / 4) - 1) * heightValue;
            }
            dispatch(shiftCardsList({ status: false, scroll: "" }));
        }
    }, [scrollToTop, dispatch, scrollToBottom.status]);

    return (
        <>
            <div ref={containerRef} className="tripCardsList">
                {trips?.map((card) => {
                    return <TripCard key={card.id} card={card} />;
                })}
                <AddCard />
            </div>
            <div className="cardsListBtns">
                <NextButton name="previous" />
                <NextButton name="next" />
            </div>
        </>
    );
};

export default TripCardsList;
