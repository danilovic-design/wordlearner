/**
 * @returns {Array} of @type {Word}
 */
export const getFilteredWordlist = (allWords, searchKeyWord) => {
  let filteredWordArray = allWords.filter((wordObject) => {
    return (
      wordObject.firstLang.includes(searchKeyWord) ||
      wordObject.secondLang.includes(searchKeyWord)
    );
  });
  return filteredWordArray;
};
