import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ element: Element, ...rest }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  return (
    <Route
      {...rest}
      render={() => (userAuth?.isAdmin ? <Element {...rest} /> : <Navigate to="/not-found" />)}
    />
  );
};

export default AdminRoute;
