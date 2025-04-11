// /* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases.
// do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
  arrayStats,
  mergeCommonElements,
  numberOfOccurrences,
} from "./arrayUtils.js";
import {
  camelCase,
  compressString,
  replaceCharsAtIndexes,
} from "./stringUtils.js";
import {
  deepEquality,
  commonKeysValues,
  calculateObject,
} from "./objectUtils.js";

//1. arrayUtils
try {
  console.log(arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20]));
} catch (e) {
  console.log(e);
}

try {
  console.log(
    arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20, "hi"])
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0]));
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0, "hi"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats([]));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayStats("banana"));
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats(["guitar", 1, 3, "apple"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayStats());
} catch (e) {
  console.log(e);
}

// 2. mergeCommonElements
try {
  console.log(
    mergeCommonElements(
      [3, 4, 1, -2, -4],
      [3, 45, 1, 24, -4],
      [112, "-4", 0, 1, 3]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements([32, 4, 1, -2, -4], "fail", [112, "-4", 0, 10, 8])
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements(
      [35, "hello", 24, ["abc", 7], 3, -4],
      [3, ["62", 4], 1, 24, -4, "abc"]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements(
      [5, 3, "apple", "banana"],
      [5, "banana", 2, 4],
      [1, 5, "apple", "banana", 0]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements(
      [5, 3, "appple", "banana"],
      [],
      [1, 50, "apple", "bannana", 0]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements(
      [4, [5, "apple"], 3],
      [3, 4, [5, "apple"]],
      [3, "apple", 6, 7]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(
    mergeCommonElements(
      ["apple", "apple"],
      ["apple", "apple", "banana"],
      ["apple", "apple", "mango"]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(mergeCommonElements([1, 2, 3], "string", [4, 5, 6]));
} catch (e) {
  console.log(e);
}

try {
  console.log(mergeCommonElements([1, 2, 3], [], [4, 5, 6]));
} catch (e) {
  console.log(e);
}
try {
  console.log(mergeCommonElements([1, 1, 2, 2, 3], [1, 2, 2, 3], [2, 2, 3, 3]));
} catch (e) {
  console.log(e);
}
try {
  console.log(
    mergeCommonElements([11, 12, 13], [14, 23, 25, 36], [20, 21, 63, 43])
  );
} catch (e) {
  console.log(e);
}

//.3 numberOfOccurrences

try {
  console.log(numberOfOccurrences([1, 2, 3], [4, 5, 6, 1], [2, 5, 6, 3]));
} catch (e) {
  console.log(e);
}
try {
  console.log(numberOfOccurrences([1, 2, 3], "fail", [2, 5, 6, 3]));
} catch (e) {
  console.log(e);
}

try {
  console.log(
    numberOfOccurrences([1, "foo", "bar"], ["bar", 5, 6, 1], ["foo", 5, 6, 3])
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(numberOfOccurrences([1, "foo", "bar"], [], ["foo", 5, 6, 3]));
} catch (e) {
  console.log(e);
}

try {
  console.log(
    numberOfOccurrences(
      ["foo", 10],
      ["bar", "hello"],
      ["foo", "world"],
      ["baz", 30],
      ["foo", 5],
      ["bar", 15],
      ["baz", "20"]
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(numberOfOccurrences(["key", "value"], [], ["key", "value"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(
    numberOfOccurrences(["key", "value"], "not an array", ["key", "value"])
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(numberOfOccurrences());
} catch (e) {
  console.log(e);
}

// 4. camelCase

try {
  console.log(camelCase("my function rocks"));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase(["my function rocks"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase("FOO BAR"));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase(["foo baar"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase("How now brown cow"));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase());
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase(""));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase(123));
} catch (e) {
  console.log(e);
}

try {
  console.log(camelCase(["Hello World"]));
} catch (e) {
  console.log(e);
}
try {
  console.log(camelCase("hi there 927"));
} catch (e) {
  console.log(e);
}

// 5. replaceCharsAtIndexes

try {
  console.log(replaceCharsAtIndexes("Daddy", [2]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes("abcabc", [1, 4]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes("abcabc", [0, 6]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes("mississippi", [1, 4, 7]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes(" ", [1, 4, 7]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes("foobar", [0]));
} catch (e) {
  console.log(e);
}
try {
  console.log(replaceCharsAtIndexes("", [1]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes(12345, [2]));
} catch (e) {
  console.log(e);
}

try {
  console.log(replaceCharsAtIndexes(("string", [0, 6])));
} catch (e) {
  console.log(e);
}

// 6. CompressSring
try {
  console.log(compressString("aaabbccc"));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString(["aaabbccc"]));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString("Hello"));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString(["Hello"], "hey"));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString("hi world"));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString("aaAA"));
} catch (e) {
  console.log(e);
}

try {
  console.log(compressString("222 Testing Compresss Stringgg"));
} catch (e) {
  console.log(e);
}

// 7. deepEquality
const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const forth = {
  a: { sA: "Hello", sB: "There", sC: "Class" },
  b: 7,
  c: true,
  d: "Test",
};
const fifth = {
  c: true,
  b: 7,
  d: "Test",
  a: { sB: "There", sC: "Class", sA: "Hello" },
};
try {
  console.log(deepEquality(first, second));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality(forth, fifth));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality(forth, third));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality({}, {}));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality("foo", "bar"));
} catch (e) {
  console.log(e);
}
const a = { m: 20, n: 55 };
const b = { m: 20, n: 55 };
const c = { m: 45, n: 60 };
try {
  console.log(deepEquality(a, b));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality([1, 2, 3], [4, 5, 6]));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality(a, c));
} catch (e) {
  console.log(e);
}

try {
  console.log(deepEquality("this ", "fails"));
} catch (e) {
  console.log(e);
}

// 8. CommonKeyValues
const one = { name: { first: "Patrick", last: "Hill" }, age: 46 };
const two = { school: "Stevens", name: { first: "Patrick", last: "Hill" } };
const three = { a: 2, b: { c: true, d: false } };
const four = { b: { c: true, d: false }, foo: "bar" };
const x = { bus: "Ronaldo", station: { to: "new york", from: "new jersey" } };
const y = { station: { to: "new york", from: "new jersey" }, commute: "train" };
const z = { communte: "path" };
try {
  console.log(commonKeysValues(x, y));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues(y, z));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues("y", z));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues([123], [123]));
} catch (e) {
  console.log(e);
}
try {
  console.log(commonKeysValues(one, two));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues(three, four));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues({}, {}));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues({ a: 1 }, { b: 2 }));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}

try {
  console.log(commonKeysValues("foo", "bar"));
} catch (e) {
  console.log(e);
}

// 9. CalculateObject

try {
  console.log(calculateObject({ a: 3, b: 7, c: 5 }, (n) => n * 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculateObject(null, (n) => n * 2));
} catch (e) {
  console.log(e);
}
try {
  calculateObject({ a: 3, b: 7, c: 5 }, null);
} catch (e) {
  console.log(e);
}
