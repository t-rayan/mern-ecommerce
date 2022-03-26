import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo?.isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
