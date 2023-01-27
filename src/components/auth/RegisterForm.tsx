import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import authSlice from "../../store/slices/auth";
import axiosService from "../../utils/axios";
import { InputForm } from ".";

const RegisterForm = () => {
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = (
    email: string,
    username: string,
    password: string
  ) => {
    axiosService
      .post(`/auth/register/`, {
        email,
        username,
        password,
      })
      .then((res) => {
        dispatch(
          authSlice.actions.setAuthTokens({
            token: res.data.access,
            refreshToken: res.data.refresh,
          })
        );
        dispatch(authSlice.actions.setAccount(res.data.user));
      })
      .catch((err) => {
        if (err.response.data.username) {
          setUsernameErr(err.response.data.username.toString());
        }
        if (err.response.data.email) {
          setEmailErr(err.response.data.email.toString());
        }
        if (err.response.data.password) {
          setPasswordErr(err.response.data.password.toString());
        }
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setUsernameErr("");
      setEmailErr("");
      setPasswordErr("");
      handleRegister(values.email, values.username, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email is required."),
      username: Yup.string().trim().required("Username is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container_form">
      <div className="content_form">
        <InputForm
          name={"email"}
          message={emailErr}
          error={formik.errors.email}
          value={formik.values.email}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          showMessage={true}
        />
        <InputForm
          name={"username"}
          message={usernameErr}
          error={formik.errors.username}
          value={formik.values.username}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          showMessage={true}
        />
        <InputForm
          name={"password"}
          message={passwordErr}
          error={formik.errors.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          showMessage={true}
        />
      </div>
      <button type="submit" disabled={loading} className="nav_btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
