import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import authSlice from "../../store/slices/auth";
import axiosService from "../../utils/axios";
import InputForm from "./InputForm";
import { AxiosResponse } from "axios";
import useTimeOut from "../../utils/useTimeOut";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnClassName, setBtnClassName] = useState("");
  const [resLogin, setResLogin] = useState<AxiosResponse<any> | null>(null);
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    setBtnClassName(" active wait_request");
    axiosService
      .post(`/auth/login/`, { email, password })
      .then((res) => {
        setResLogin(res);
        setBtnClassName(" active success_request");
      })
      .catch((err) => {
        setMessage(err.response.data.detail.toString());
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
      <button
        type="submit"
        disabled={loading}
        className={"nav_btn" + btnClassName}
      >
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
