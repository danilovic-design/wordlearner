import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

/**
 *  Collection name in database. The intire database is stored inside one collection
 * @returns {String} variable
 */

export const databaseCollection = "data";

/**
 * 
 * @typedef Word
 * @type {Object}
 * @property {String} firstLang - one of the two languages of a Dictionary.
 * @property {String} secondLang - one of the two languages of a Dictionary.
 * @property {number} rightGuesses - returns the number how many times the word had a right guess.
 *
 * 
 * @typedef Dictionary
 * @type {Object}
 * @property {String} firstLang - one of the two languages of a Dictionary.
 * @property {String} secondLang - one of the two languages of a Dictionary.
 * @property {Array} words - an array of @type {Word}.
 *
 * /
 

/** newDict
 * It may only be called by saveDict function
 * Creates a new @type {Dictionary} in the database
 * @param {Object} data - must contain @type {Word} and a {String}[dictId]
 * @returns a Promise from the database
 * This function is called when there are no dictionaries yet, and the first one is introduced.
 */

const createNewDictionary = (data) => {
  console.log(data);
  let newDictionary = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
    dictId: `${data.firstLang
      .toLowerCase()
      .trim()
      .split(" ")
      .join("")
      .split("<")
      .join("")
      .split(">")
      .join("")}${data.secondLang
      .toLowerCase()
      .trim()
      .split(" ")
      .join("")
      .split("<")
      .join("")
      .split(">")
      .join("")}`,
  };
  let dbData = { userDictionaries: [newDictionary] };

  return setDoc(doc(db, databaseCollection, data.userId), dbData);
};

/**
 * It may only be called by saveDict function
 * @param {Object} data - must contain <Wordobject> data
 * @returns a Promise from the database
 * This function is called (used) when there are more used dictionaries and one more is added
 */
const addNewDictionary = (data) => {
  console.log(data);
  let newDictData = {
    firstLang: data.firstLang,
    secondLang: data.secondLang,
    words: [],
    dictId: `${data.firstLang
      .toLowerCase()
      .trim()
      .split(" ")
      .join("")
      .split("<")
      .join("")
      .split(">")
      .join("")}${data.secondLang
      .toLowerCase()
      .trim()
      .split(" ")
      .join("")
      .split("<")
      .join("")
      .split(">")
      .join("")}`,
  };

  let updatedDictionaries = [...data.userDictionaries];
  updatedDictionaries.unshift(newDictData);

  let dbData = { userDictionaries: updatedDictionaries };

  return setDoc(doc(db, databaseCollection, data.userId), dbData);
};

/**
 * The function saves a new @type {Dictionary} to the database.
 * Handles two other functions that handle either the case of empty DB
 * or already having a dictionary
 * @param {Object} data - <WordObject>
 */
export const saveDict = (data) => {
  if (data.userDictionaries.length !== 0) {
    return addNewDictionary(data);
  } else {
    return createNewDictionary(data);
  }
};

export const deleteDict = (userDictionaries, dict2delete, userId) => {
  let newDict = userDictionaries.filter((dict) => {
    return dict.dictId !== dict2delete;
  });
  let saveData = { userDictionaries: newDict };
  return setDoc(doc(db, databaseCollection, userId), saveData);
};

export const deleteEveryDictionary = ({ userId }) => {
  deleteDoc(doc(db, databaseCollection, userId));
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

  unchangedDictionaries.unshift(changedDictionary[0]);

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

  unchangedDictionaries.unshift(changedDictionary[0]);

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

  unchangedDictionaries.unshift(changedDictionary[0]);

  let dbData = { userDictionaries: unchangedDictionaries };

  return setDoc(doc(db, databaseCollection, userId), dbData);
};
