import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import authSlice from "../store/slices/auth";
import gameSlice from "../store/slices/game";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameSlice.actions.setActivityOff());
    dispatch(authSlice.actions.setLogout()); // eslint-disable-next-line
  }, []);

  return <Redirect to="/login" />;
};

export default Logout;
