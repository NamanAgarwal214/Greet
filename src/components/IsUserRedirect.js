import React from "react";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const isUserRedirect = ({ loggedIn, name }) => {
  return loggedIn ? <Navigate to={<Home />} /> : name;
};

export default isUserRedirect;
