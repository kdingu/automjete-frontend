import React from "react";
import Input from "@/components/input";
import {useTranslation} from "next-i18next";

import css from "./styles.module.css";
import Button from "@/components/button";
import {useDispatch} from "react-redux";
import sessionSlice from "@/store/features/session/slice";
import {useFormik} from "formik";

const RegistrationForm = (props) => {
    const {t} = useTranslation("login");
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
        },
        validateOnChange: false,
        onSubmit: (values) => {
            dispatch(
                sessionSlice.actions.register({
                    email: values.email,
                    name: values.name,
                    password: values.password,
                })
            );
        },
        validate: (values, props) => {
            const errors = {};

            if (!values.email) {
                errors.email = "Email required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.name) {
                errors.name = "Name required";
            }
            if (!values.password) {
                errors.password = "Password required";
            }
            return errors;
        },
    });

    return (
        <div className={css.RegisterContainer}>
            <span className="text-3xl">Register an account</span>
            <Input
                type="email"
                id="email"
                name="email"
                error={formik.errors.email}
                value={formik.values.email}
                handleChange={formik.handleChange}
                label={t("emailLabel")}
            />
            <Input
                type="text"
                id="name"
                name="name"
                error={formik.errors.name}
                value={formik.values.name}
                handleChange={formik.handleChange}
                label={t("nameLabel")}
            />
            <Input
                type="password"
                id="password"
                name="password"
                error={formik.errors.password}
                value={formik.values.password}
                handleChange={formik.handleChange}
                label={t("passwordLabel")}
            />
            {props.authError && <div className="text-red-500">{props.authError}</div>}
            <Button onClick={formik.handleSubmit} text="Register"/>
            <span>
        Already have an account?{" "}
                <a
                    className="cursor-pointer underline"
                    onClick={() => props.setAuthState("login")}
                >
          Login here
        </a>
      </span>
        </div>
    );
};

export default RegistrationForm;
