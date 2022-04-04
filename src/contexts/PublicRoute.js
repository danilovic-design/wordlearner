import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";

function PublicRoute({ children, location, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Navigate
      to={{
        pathname: "/dictionaries",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
}

export default PublicRoute;
