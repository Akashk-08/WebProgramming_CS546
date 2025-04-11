/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const validateObject = (obj1, obj2) => {
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    throw new Error("Objects Shouldn't be Null");
  }
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    throw new Error("Objects Shouldn't be arrays");
  }
};

export let deepEquality = (obj1, obj2) => {
  validateObject(obj1, obj2);
  const value1 = Object.keys(obj1);
  const value2 = Object.keys(obj2);

  if (value1.length !== value2.length) return false;

  for (let i = 0; i < value1.length; i++) {
    const key = value1[i];

    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      if (!deepEquality(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export let commonKeysValues = (obj1, obj2) => {
  validateObject(obj1, obj2);
  let result = {};
  for (let key in obj1) {
    if (key in obj2) {
      if (
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object" &&
        obj1[key] !== null &&
        obj2[key] !== null
      ) {
        const commonValue = commonKeysValues(obj1[key], obj2[key]);
        if (Object.keys(commonValue).length > 0) {
          result[key] = commonValue;
        }
        for (let commonKey in commonValue) {
          result[commonKey] = commonValue[commonKey];
        }
      } else if (obj1[key] === obj2[key]) {
        result[key] = obj1[key];
      }
    }
  }

  return result;
};

export let calculateObject = (object, func) => {
  if (typeof object !== "object" || object === null)
    throw new Error("It should be object.");
  if (typeof func !== "function") throw new Error("It should be function.");

  let result = {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let value = object[key];
      if (typeof value !== "number" || isNaN(value)) {
        throw new Error("All values must be numbers.");
      }
      let funcResult = func(value);
      let sqrtResult = Math.sqrt(funcResult).toFixed(2);

      result[key] = parseFloat(sqrtResult);
    }
  }
  return result;
};
