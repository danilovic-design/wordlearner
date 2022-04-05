import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

/**
 *  Collection name in database. The intire database is stored inside one collection
 * @returns {String} variable
 */

export const databaseCollection = "data";

/**
 * It may only be called by saveDict function
 * @param {Object} data - must contain <Wordobject> data
 * @returns a Promise from the database
 */

const newDict = (data) => {
  let newDictData = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
    dictId: `${data.firstLang.toLowerCase()}${data.secondLang.toLowerCase()}`,
  };
  let dbData = { userDictionaries: [newDictData] };

  return setDoc(doc(db, databaseCollection, data.userId), dbData);
};

/**
 * It may only be called by saveDict function
 * @param {Object} data - must contain <Wordobject> data
 * @returns a Promise from the database
 */
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
  return setDoc(doc(db, databaseCollection, data.userId), dbData);
};

/**
 * The function saves a new <Dictionary> to the database.
 * Handles two other functions that handle either the case of empty DB
 * or already having a dictionary
 * @param {Object} data - <WordObject>
 */
export const saveDict = (data) => {
  if (data.userDictionaries.length !== 0) {
    return existingDict(data);
  } else {
    return newDict(data);
  }
};

export const deleteDict = (userDictionaries, dict2delete, userId) => {
  let newDict = userDictionaries.filter((dict) => {
    return dict.dictId !== dict2delete;
  });
  let saveData = { userDictionaries: newDict };
  return setDoc(doc(db, databaseCollection, userId), saveData);
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

  return setDoc(doc(db, databaseCollection, userId), dbData);
};

export const deleteWord = ({ userId, dictId, userDictionaries, wordData }) => {
  let unchangedDictionaries = userDictionaries.filter((dict) => {
    return dict.dictId !== dictId;
  });
  let changedDictionary = userDictionaries.filter((dict) => {
    return dict.dictId === dictId;
  });

  let changedWordList = changedDictionary[0].words.filter((word) => {
    return word.firstLang !== wordData.firstLang;
  });

  changedDictionary[0].words = changedWordList;

  unchangedDictionaries.push(changedDictionary[0]);

  let dbData = { userDictionaries: unchangedDictionaries };

  return setDoc(doc(db, databaseCollection, userId), dbData);
};

export const changeWord = ({
  userId,
  dictId,
  userDictionaries,
  wordData,
  newWord,
}) => {
  let unchangedDictionaries = userDictionaries.filter((dict) => {
    return dict.dictId !== dictId;
  });
  let changedDictionary = userDictionaries.filter((dict) => {
    return dict.dictId === dictId;
  });

  let changedWordList = changedDictionary[0].words.filter((word) => {
    return word.firstLang !== wordData.firstLang;
  });

  changedWordList.push(newWord);

  changedDictionary[0].words = changedWordList;

  unchangedDictionaries.push(changedDictionary[0]);

  let dbData = { userDictionaries: unchangedDictionaries };

  return setDoc(doc(db, databaseCollection, userId), dbData);
};
