import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import authSlice from "../../store/slices/auth";
import axiosService from "../../utils/axios";
import { InputForm } from ".";
import useTimeOut from "../../utils/useTimeOut";
import { AxiosResponse } from "axios";

const RegisterForm = () => {
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnClassName, setBtnClassName] = useState("");
  const [resLogin, setResLogin] = useState<AxiosResponse<any> | null>(null);
  const dispatch = useDispatch();

  const handleRegister = (
    email: string,
    username: string,
    password: string
  ) => {
    setBtnClassName(" active wait_request");
    axiosService
      .post(`/auth/register/`, {
        email,
        username,
        password,
      })
      .then((res) => {
        setResLogin(res);
        setBtnClassName(" active success_request");
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
        setBtnClassName(" active failed_request");
      });
  };

  useTimeOut(
    () => {
      if (resLogin) {
        dispatch(
          authSlice.actions.setAuthTokens({
            token: resLogin.data.access,
            refreshToken: resLogin.data.refresh,
          })
        );
        dispatch(authSlice.actions.setAccount(resLogin.data.user));
      } else {
        setBtnClassName("");
        setLoading(false);
      }
    },
    btnClassName === " active success_request" ||
      btnClassName === " active failed_request"
      ? 2100
      : null
  );

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
      <button
        type="submit"
        disabled={loading}
        className={"nav_btn" + btnClassName}
      >
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
