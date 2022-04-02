import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";

function PrivateRoute({ children, location, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
}

export default PrivateRoute;
