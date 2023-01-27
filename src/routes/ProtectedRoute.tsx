import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProtectedRoute = (props: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.account ? <Route {...props} /> : <Redirect to="/login" />;
};

export const LoginRoute = (props: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.account ? <Redirect to="/profile" /> : <Route {...props} />;
};
