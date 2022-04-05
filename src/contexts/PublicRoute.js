import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";
import { PAGEROOT } from "../database/deploy";

function PublicRoute({ children, location, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);
  let resolvedPathname = `${PAGEROOT}dictionaries`;

  return isAuthenticated ? (
    <Navigate
      to={{
        pathname: resolvedPathname,
        state: { from: location },
      }}
    />
  ) : (
    children
  );
}

export default PublicRoute;
