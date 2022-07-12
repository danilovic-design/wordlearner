export const sanitize = (input) => {
  let sanitizeMe = input;
  const badCharacters = [">", "<", "{", "}"];
  for (let character of badCharacters) {
    sanitizeMe = sanitizeMe.split(character).join("");
  }
  return sanitizeMe;
};

export const noWhiteSpace = (input) => {
  return input.trim().split(" ").join("");
};
