import React, { createContext, useState } from "react";

export const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookiesConsented, setCookiesConsented] = useState(
    JSON.parse(localStorage.getItem("cookieconsent")) || false
  );

  const setLocalCookiesConsented = () => {
    setCookiesConsented(true);
    localStorage.setItem("cookieconsent", "true");
  };

  return (
    <CookieContext.Provider
      value={{ cookiesConsented, setLocalCookiesConsented }}
    >
      {children}
    </CookieContext.Provider>
  );
};
