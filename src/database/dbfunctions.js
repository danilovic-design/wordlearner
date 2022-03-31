import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseconfig";

const newDict = (data) => {
  let newDictData = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
  };
  let dbData = { userDictionaries: [newDictData] };
  console.log("[+] - Saving dict to user", data.userId);

  return setDoc(doc(db, "data", data.userId), dbData);
};

const existingDict = (data) => {
  let newDictData = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
  };
  let updatedDictionaries = [...data.dictionaries];
  updatedDictionaries.push(newDictData);
  let dbData = { userDictionaries: updatedDictionaries };
  console.log("[+] - Updating dict to user", data.userId);
  console.log(dbData);

  return setDoc(doc(db, "data", data.userId), dbData);
};

export const saveDict = (data) => {
  if (data.dictionaries) {
    console.log("[+] - Adding to existing DB");
    return existingDict(data);
  } else {
    return newDict(data);
  }
};
