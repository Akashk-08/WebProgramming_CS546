export const questionOne = (index) => {
  return Array.from(index, (n) => factorial(n));
};

const factorial = (n) => {
  if (n === 0) return 1;
  if (n < 0 || !Number.isInteger(n)) return undefined;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const questionTwo = (arr) => {
  if (!arr || arr.length === 0) return {};

  const result = {};
  for (const n of arr) {
    result[n] = primeNumber(n);
  }
  return result;
};

const primeNumber = (n) => {
  if (n <= 0) return undefined;
  if (n === 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++)
    if (n % i === 0) {
      return false;
    }
  return true;
};

export const questionThree = (str) => {
  const result = {
    uppercase: 0,
    lowercase: 0,
    numbers: 0,
    spaces: 0,
    otherCharacters: 0,
  };

  for (let element of str) {
    if (/[A-Z]/.test(element)) {
      result.uppercase++;
    } else if (/[a-z]/.test(element)) {
      result.lowercase++;
    } else if (/[0-9]/.test(element)) {
      result.numbers++;
    } else if (/[ ]/.test(element)) {
      result.spaces++;
    } else {
      result.otherCharacters++;
    }
  }

  return result;
};

export const questionFour = (arr) => {
  const numbers = [];
  const strings = [];

  for (const element of arr) {
    if (typeof element === "number") {
      numbers.push(element);
    } else if (typeof element === "string") {
      strings.push(element);
    }
  }

  numbers.sort((a, b) => a - b);
  strings.sort();

  return [...numbers, ...strings];
};

export const studentInfo = {
  firstName: "AKASH",
  lastName: "KULKARNI",
  studentId: "20034382",
};
