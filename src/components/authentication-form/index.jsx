import React, {useState} from "react";
import LoginForm from "@/components/login-form";
import RegistrationForm from "@/components/registration-form";
import {getAuthFormSelectors} from "./selectors";
import {connect} from "react-redux";

const AuthenticationForm = (props) => {
    const [authState, setAuthState] = useState("login");

    return (
        <div className="w-full">
            {authState === "login" && (
                <LoginForm authError={props.authError} setAuthState={setAuthState}/>
            )}
            {authState === "register" && (
                <RegistrationForm
                    authError={props.authError}
                    setAuthState={setAuthState}
                />
            )}
        </div>
    );
};

export default connect(getAuthFormSelectors)(AuthenticationForm);
