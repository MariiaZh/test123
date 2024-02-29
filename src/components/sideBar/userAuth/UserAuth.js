import "./UserAuth.css";
import User from "../../../assets/user_818944.png";
import Logout from "../../../assets/logout_3889524.png";
import { useDispatch, useSelector } from "react-redux";
import { modalUse, logOut } from "../../../store/tripsSlice";

const UserAuth = () => {
    const dispatch = useDispatch();
    const { userProfile } = useSelector((state) => state.trips);
    const onModalAuthOpen = () => {
        dispatch(modalUse({ name: "modalAuth", value: true }));
    };

    const onLogOut = () => {
        dispatch(logOut());
    };

    return userProfile.email ? (
        <div className="userWrapper loginWrapper">
            <div>
                <p className="userName">{userProfile.name}</p>
                <p className="userName userNameSmall">{userProfile.email}</p>
                <img className="logoutIcon" src={Logout} onClick={onLogOut} />
            </div>

            <div>
                <img className="loginPicture" src={userProfile.picture} />
            </div>
        </div>
    ) : (
        <div className="userWrapper">
            <div onClick={onModalAuthOpen}>
                <img className="loginIcon" src={User} />
                <h2 className="userName">log in</h2>
            </div>
        </div>
    );
};

export default UserAuth;
