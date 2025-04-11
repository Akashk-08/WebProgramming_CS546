/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const validateString = (str) => {
  if (str === undefined) throw new Error("Input must be provided");
  if (typeof str !== "string") throw new Error("Input must be string");
  if (str.length === 0)
    throw new Error("Input String must be greater than zero");
  if (str.trim().length === 0)
    throw new Error("String must not be empty or just spaces");
};

export let camelCase = (str) => {
  validateString(str);
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

export let replaceCharsAtIndexes = (str, idxArr) => {
  validateString(str);
  for (let index of idxArr) {
    if (
      typeof index !== "number" ||
      index < 1 ||
      index > str.length - 2 ||
      !Number.isInteger(index)
    ) {
      throw new Error("Must be a valid integer");
    }
  }

  let stringArray = str.split("");

  for (let index of idxArr) {
    const targetChar = stringArray[index];
    const beforeChar = stringArray[index - 1];
    const afterChar = stringArray[index + 1];

    let alternate = false;
    for (let i = index + 1; i < stringArray.length; i++) {
      if (stringArray[i] === targetChar) {
        stringArray[i] = alternate ? afterChar : beforeChar;
        alternate = !alternate;
      }
    }
  }
  return stringArray.join("");
};

export let compressString = (str) => {
  validateString(str);
  let result = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      result += str[i];
      if (count > 1) result += count;
      count = 1;
    }
  }

  return result;
};
