import React from "react";
import { UserHub } from "../components/profile";
import { LoginForm } from "../components/auth";

const Login = () => {
  document.title = "TeeTooMon - Login";
  return <UserHub message={<>Log In</>} content={<LoginForm />} form={true} />;
};

export default Login;
