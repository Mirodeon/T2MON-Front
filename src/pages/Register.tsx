import React from "react";
import { RegisterForm } from "../components/auth";
import { UserHub } from "../components/profile";

const Register = () => {
  document.title = "TeeTooMon - Register";
  return (
    <UserHub message={<>Register</>} content={<RegisterForm />} form={true} />
  );
};

export default Register;
