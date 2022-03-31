import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebaseconfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("[inside] - OnAuthStateChanged - user present ");
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        //setIsAuthenticated(true);
        // ...
        setUid(user.uid);
        setIsAuthenticated(true);
      } else {
        console.log("[inside] - OnAuthStateChanged - user NOT present ");
        // User is signed out
        // ...
        //setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, uid, setUid }}
    >
      {children}
    </AuthContext.Provider>
  );
};
