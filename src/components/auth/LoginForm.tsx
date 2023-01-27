import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import authSlice from "../../store/slices/auth";
import axiosService from "../../utils/axios";
import InputForm from "./InputForm";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    axiosService
      .post(`/auth/login/`, { email, password })
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
        setMessage(err.response.data.detail.toString());
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setMessage("");
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container_form">
      <div className="content_form">
        <InputForm
          name={"email"}
          message={message}
          error={formik.errors.email}
          value={formik.values.email}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          showMessage={false}
        />
        <InputForm
          name={"password"}
          message={message}
          error={formik.errors.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          showMessage={false}
        />
        <div className="container_input_form">
          <div className="error_form">{message ? message : null}</div>
        </div>
      </div>
      <button type="submit" disabled={loading} className="nav_btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
