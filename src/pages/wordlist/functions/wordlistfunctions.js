/**
 * @returns {Array} of @type {Word}
 */
export const getFilteredWordlist = (allWords, searchKeyWord) => {
  let filteredWordArray = allWords.filter((wordObject) => {
    return (
      wordObject.firstLang
        .toLowerCase()
        .includes(searchKeyWord.toLowerCase()) ||
      wordObject.secondLang.toLowerCase().includes(searchKeyWord.toLowerCase())
    );
  });
  return filteredWordArray;
};
