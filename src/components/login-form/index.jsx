import React, {useEffect} from "react";
import Input from "@/components/input";
import { useTranslation } from "next-i18next";
import css from "./styles.module.css";
import Button from "@/components/button";
import { useDispatch } from "react-redux";
import sessionSlice from "@/store/features/session/slice";
import { useFormik } from "formik";

const LoginForm = (props) => {
  const { t } = useTranslation("login");
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
        sessionSlice.actions.login({
          email: values.email,
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
      if (!values.password) {
        errors.password = "Password required";
      }
      return errors;
    },
  });

  return (
    <div className={css.LoginContainer}>
      <span className="text-3xl">Sign in</span>
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
        type="password"
        id="password"
        name="password"
        error={formik.errors.password}
        value={formik.values.password}
        handleChange={formik.handleChange}
        label={t("passwordLabel")}
      />
      {props.authError && <div className="text-red-500">{props.authError}</div>}
      <Button onClick={formik.handleSubmit} text="Login" />
      <span>
        Dont have an account?{" "}
        <a
          className="cursor-pointer underline"
          onClick={() => props.setAuthState("register")}
        >
          Register here
        </a>
      </span>
    </div>
  );
};

export default LoginForm;
