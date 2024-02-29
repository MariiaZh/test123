import "./ModalAuth.css";
import { useSelector, useDispatch } from "react-redux";
import GoogleLoginButton from "./GoogleLoginButton";
import { modalUse } from "../../store/tripsSlice";

const ModalAuth = () => {
    const dispatch = useDispatch();
    const modalAuth = useSelector((state) => state.trips.modalAuth);

    const onCloseModal = () => {
        dispatch(modalUse({ name: "modalAuth", value: false }));
    };

    return (
        modalAuth && (
            <div className="modalAuth modalActive">
                <div className="authForm">
                    <div className="authHeaderWrapper">
                        <div className="authHeader">
                            <h3>Log in</h3>
                            <input
                                className="closeButton"
                                type="button"
                                onClick={onCloseModal}
                            />
                        </div>
                    </div>
                    <GoogleLoginButton />
                </div>
            </div>
        )
    );
};

export default ModalAuth;
