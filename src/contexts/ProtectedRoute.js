import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";
import { PAGEROOT } from "../database/deploy";

function PrivateRoute({ children, location, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);
  let resolvedPathname = `${PAGEROOT}login`;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: resolvedPathname,
        state: { from: location },
      }}
    />
  );
}

export default PrivateRoute;
