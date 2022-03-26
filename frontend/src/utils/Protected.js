import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} repace />;
  }
};

export default Protected;
