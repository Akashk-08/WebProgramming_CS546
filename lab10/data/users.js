//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

export const register = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  if (
    !firstName ||
    typeof firstName !== "string" ||
    !firstName.trim() ||
    firstName.trim().length < 2 ||
    firstName.trim().length > 20 ||
    !/^[A-Za-z]+$/.test(firstName.trim())
  ) {
    throw new Error(
      "First name must be 2-20 alphabetic characters, no numbers or spaces."
    );
  }

  if (
    !lastName ||
    typeof lastName !== "string" ||
    !lastName.trim() ||
    lastName.trim().length < 2 ||
    lastName.trim().length > 20 ||
    !/^[A-Za-z]+$/.test(lastName.trim())
  ) {
    throw new Error(
      "Last name must be 2-20 alphabetic characters, no numbers or spaces."
    );
  }

  if (
    !userId ||
    typeof userId !== "string" ||
    !userId.trim() ||
    userId.trim().length < 5 ||
    userId.trim().length > 10 ||
    !/^[A-Za-z0-9]+$/.test(userId.trim())
  ) {
    throw new Error(
      "User ID must be 5-10 alphanumeric characters, no spaces or symbols."
    );
  }

  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    /\s/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    throw new Error(
      "Password must be at least 8 characters, with one uppercase letter, one number, and one special character. No spaces allowed."
    );
  }

  if (
    !favoriteQuote ||
    typeof favoriteQuote !== "string" ||
    favoriteQuote.trim().length < 20 ||
    favoriteQuote.trim().length > 255
  ) {
    throw new Error("Favorite quote must be between 20 and 255 characters.");
  }

  if (
    !themePreference ||
    typeof themePreference !== "object" ||
    !themePreference.backgroundColor ||
    !themePreference.fontColor ||
    Object.keys(themePreference).length !== 2 ||
    !/^#[0-9A-Fa-f]{6}$/.test(themePreference.backgroundColor) ||
    !/^#[0-9A-Fa-f]{6}$/.test(themePreference.fontColor) ||
    themePreference.backgroundColor === themePreference.fontColor
  ) {
    throw new Error(
      "Theme preferences must include two distinct valid hex color codes."
    );
  }

  if (
    !role ||
    typeof role !== "string" ||
    (role.toLowerCase() !== "user" && role.toLowerCase() !== "superuser")
  ) {
    throw new Error("Role must be either 'user' or 'superuser'.");
  }

  const userCollection = await users();
  const normalizedUserId = userId.trim().toLowerCase();

  const duplicate = await userCollection.findOne({ userId: normalizedUserId });
  if (duplicate) {
    throw new Error("User ID already exists. Please choose a different one.");
  }

  const hashedPass = await bcrypt.hash(password, 16);

  const dateObj = new Date();
  const signupDate = `${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(dateObj.getDate()).padStart(2, "0")}/${dateObj.getFullYear()}`;

  const newUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    userId: normalizedUserId,
    password: hashedPass,
    favoriteQuote: favoriteQuote.trim(),
    themePreference,
    role: role.toLowerCase(),
    signupDate,
    lastLogin: null,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.insertedId) {
    throw new Error("Registration failed. Try again later.");
  }

  return { registrationCompleted: true };
};

export const login = async (userId, password) => {
  if (
    !userId ||
    typeof userId !== "string" ||
    !userId.trim() ||
    userId.trim().length < 5 ||
    userId.trim().length > 10 ||
    !/^[A-Za-z0-9]+$/.test(userId.trim())
  ) {
    throw new Error("Invalid user ID format.");
  }

  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    /\s/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    throw new Error("Invalid password format.");
  }

  const userCollection = await users();
  const userRecord = await userCollection.findOne({
    userId: userId.trim().toLowerCase(),
  });

  if (!userRecord) {
    throw new Error("Either the userId or password is invalid.");
  }

  const isMatch = await bcrypt.compare(password, userRecord.password);
  if (!isMatch) {
    throw new Error("Either the userId or password is invalid.");
  }

  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const lastLoginTime = `${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(now.getDate()).padStart(2, "0")}/${now.getFullYear()} ${String(
    hours
  ).padStart(2, "0")}:${minutes}${ampm}`;

  await userCollection.updateOne(
    { _id: userRecord._id },
    { $set: { lastLogin: lastLoginTime } }
  );

  return {
    firstName: userRecord.firstName,
    lastName: userRecord.lastName,
    userId: userRecord.userId,
    favoriteQuote: userRecord.favoriteQuote,
    themePreference: userRecord.themePreference,
    role: userRecord.role,
    signupDate: userRecord.signupDate,
    lastLogin: lastLoginTime,
  };
};
