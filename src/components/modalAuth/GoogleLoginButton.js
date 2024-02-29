import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logInUser, modalUse } from "../../store/tripsSlice";

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const onResponse = (response) => {
        dispatch(logInUser(jwtDecode(response.credential)));
        dispatch(modalUse({ name: "modalAuth", value: false }));
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <div className="googleBtn">
            <h2>Sign in with Google account</h2>
            <GoogleLogin onSuccess={onResponse} onError={errorMessage} />
        </div>
    );
};
export default GoogleLoginButton;
