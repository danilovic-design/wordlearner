import React, { createContext, useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebaseconfig";
import { AuthContext } from "./Authcontext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [storedDictionaryData, setStoredDictionaryData] = useState([]);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    console.log("[+] - DataProvider, user effect for user", uid);
    try {
      if (uid) {
        console.log("[+] - Fetching DATA");
        onSnapshot(doc(db, "data", uid), (doc) => {
          console.log(doc);
          console.log("Current data: ", doc.data());
          let currentData = doc.data();
          if (currentData) {
            console.log("[+] - setting storedDictionaryData");
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
