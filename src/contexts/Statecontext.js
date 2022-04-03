import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <StateContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </StateContext.Provider>
  );
};
