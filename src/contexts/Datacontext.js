import React, { createContext, useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebaseconfig";
import { AuthContext } from "./Authcontext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [storedDictionaryData, setStoredDictionaryData] = useState([]);
  const { uid } = useContext(AuthContext);
  console.log("[+] -", uid);

  useEffect(() => {
    console.log("[+] - DataProvedier, user effect for user", uid);
    try {
      onSnapshot(doc(db, "data", uid), (doc) => {
        console.log(doc);
        console.log("Current data: ", doc.data());
        setStoredDictionaryData(doc.data().userDictionaries);
      });
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
