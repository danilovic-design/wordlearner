import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseconfig";

const newDict = (data) => {
  let newDictData = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
    dictId: `${data.firstLang.toLowerCase()}${data.secondLang.toLowerCase()}`,
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
    dictId: `${data.firstLang.toLowerCase()}${data.secondLang.toLowerCase()}`,
  };
  let updatedDictionaries = [...data.userDictionaries];
  updatedDictionaries.push(newDictData);
  let dbData = { userDictionaries: updatedDictionaries };
  console.log("[+] - Updating dict to user", data.userId);
  console.log(dbData);

  return setDoc(doc(db, "data", data.userId), dbData);
};

export const saveDict = (data) => {
  console.log("[+] - saveDict function, dictionaries", data);
  if (data.userDictionaries.length !== 0) {
    console.log("[+] - Adding to existing DB");
    return existingDict(data);
  } else {
    console.log("[+] - Creating a new dictionary in DB");
    return newDict(data);
  }
};

export const deleteDict = (userDictionaries, dict2delete, userId) => {
  let newDict = userDictionaries.filter((dict) => {
    return dict.dictId !== dict2delete;
  });
  let saveData = { userDictionaries: newDict };
  return setDoc(doc(db, "data", userId), saveData);
};

export const saveNewWord = ({
  userId,
  dictId,
  userDictionaries,
  firstLang,
  secondLang,
}) => {
  let unchangedDictionaries = userDictionaries.filter((dict) => {
    return dict.dictId !== dictId;
  });
  let changedDictionary = userDictionaries.filter((dict) => {
    return dict.dictId === dictId;
  });

  let changedWords = [...changedDictionary[0].words];
  changedWords.push({
    firstLang: firstLang,
    secondLang: secondLang,
    rightGuesses: 0,
  });
  changedDictionary[0].words = changedWords;

  unchangedDictionaries.push(changedDictionary[0]);

  let dbData = { userDictionaries: unchangedDictionaries };

  return setDoc(doc(db, "data", userId), dbData);
};

export const deleteWord = ({ userId, dictId, userDictionaries, wordData }) => {
  console.log("[+] - Delete word from DB");
  console.log("[+] - Word data", wordData);
  let unchangedDictionaries = userDictionaries.filter((dict) => {
    console.log("[+] - Filtering UNchanged");
    console.log(dict.dictId, dictId);
    return dict.dictId !== dictId;
  });
  let changedDictionary = userDictionaries.filter((dict) => {
    console.log("[+] - Filtering changed");
    console.log(dict.dictId, dictId);
    return dict.dictId === dictId;
  });

  let changedWordList = changedDictionary[0].words.filter((word) => {
    return word.firstLang !== wordData.firstLang;
  });
  //console.log(changedWordList);

  changedDictionary[0].words = changedWordList;

  unchangedDictionaries.push(changedDictionary[0]);

  let dbData = { userDictionaries: unchangedDictionaries };
  //console.log(dbData);

  return setDoc(doc(db, "data", userId), dbData);
};
