import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebaseconfig";
import { StateContext } from "./Statecontext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setIsLoaded } = useContext(StateContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsAuthenticated(true);
      }
      setIsLoaded(true);
    });
  }, [setIsAuthenticated, setIsLoaded]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, uid, setUid }}
    >
      {children}
    </AuthContext.Provider>
  );
};
