import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ path, element }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  if (userAuth) {
    return element;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;