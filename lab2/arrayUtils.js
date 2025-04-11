/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let arrayStats = (array) => {
  if (!Array.isArray(array)) throw new Error("Input must be an array");
  if (array.length === 0) throw new Error("Array cannot be empty");
  if (!array.every((element) => typeof element === "number"))
    throw new Error("All elements must be numbers ");
  if (!array.every((k) => isFinite(k)))
    throw new Error("Array contains infinite values");
  array.sort((a, b) => a - b);

  const count = array.length;
  const minimum = array[0];
  const maximum = array[count - 1];
  const range = maximum - minimum;
  const sum = array.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  let median;
  {
    if (count % 2 === 0) {
      median = (array[count / 2 - 1] + array[count / 2]) / 2;
    } else {
      median = array[Math.floor(count - 1) / 2];
    }
  }

  let mode = [];
  const numCount = {};
  let highCount = 0;
  for (const num of array) {
    numCount[num] = (numCount[num] || 0) + 1;
    if (numCount[num] > highCount) {
      highCount = numCount[num];
    }
  }

  for (let num in numCount) {
    if (numCount[num] === highCount) {
      mode.push(Number(num));
    }
  }
  if (mode.length === count) {
    mode = 0;
  } else if (mode.length === 1) {
    mode = mode[0];
  }

  return { mean, median, mode, range, minimum, maximum, count, sum };
};

export let mergeCommonElements = (...arrays) => {
  if (arrays.length < 2) throw new Error("at least two array must be provided");
  if (!arrays.every((arr) => Array.isArray(arr)))
    throw new Error("Input must be an array");
  if (arrays.some((arr) => arr.length === 0))
    throw new Error("Each array must have at least one element");

  const getElements = (arr, result = []) => {
    for (let item of arr) {
      if (Array.isArray(item)) {
        getElements(item, result);
      } else if (typeof item === "number" || typeof item === "string") {
        result.push(item);
      }
    }
    return result;
  };

  let cleanArray = arrays.map((arr) => getElements(arr));

  let commonElements = cleanArray[0].filter((item) =>
    cleanArray.every((arr) => arr.includes(item))
  );

  commonElements = [...new Set(commonElements)];

  commonElements.sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    if (typeof a === "string" && typeof b === "string")
      return typeof a === "number" ? -1 : 1;
    return typeof a === "number" ? -1 : 1;
  });
  return commonElements;
};

export let numberOfOccurrences = (...arrays) => {
  if (arrays.length === 0)
    throw new Error("At least one array must be provided");
  const occurrences = {};

  for (const arr of arrays) {
    if (!Array.isArray(arr)) {
      throw new Error("Each input must be an array");
    }
    if (arr.length === 0) {
      throw new Error("Each array must have at least one valid element");
    }
    let hasValidElement = false;
    for (const element of arr) {
      if (
        typeof element === "number" ||
        (typeof element === "string" &&
          (/^[a-zA-Z]+$/.test(element) || /^[0-9]+$/.test(element)))
      ) {
        occurrences[element] = (occurrences[element] || 0) + 1;
        hasValidElement = true;
      } else {
        throw new Error(
          "Array must be numbers or strings containing only letters"
        );
      }
    }
    if (!hasValidElement) {
      throw new Error("Each array must contain at least one number or string");
    }
  }
  return occurrences;
};
