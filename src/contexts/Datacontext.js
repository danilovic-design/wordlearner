import React, { createContext, useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebaseconfig";
import { AuthContext } from "./Authcontext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [storedDictionaryData, setStoredDictionaryData] = useState([]);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    try {
      if (uid) {
        onSnapshot(doc(db, "data", uid), (doc) => {
          let currentData = doc.data();
          if (currentData) {
            setStoredDictionaryData(currentData.userDictionaries);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [uid]);

  return (
    <DataContext.Provider
      value={{ storedDictionaryData, setStoredDictionaryData }}
    >
      {children}
    </DataContext.Provider>
  );
};
