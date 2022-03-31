import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";

function PublicRoute({ children, location, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);
  console.log("[+] - Public route, isAuthenticated", isAuthenticated);
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
}

export default PublicRoute;
