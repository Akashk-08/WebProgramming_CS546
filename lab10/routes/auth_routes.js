//import express, express router as shown in lecture code
import express from "express";
import { register, login } from "../data/users.js";
import {
  loginPageRedirect,
  registerPageRedirect,
  userAuth,
  superUserAuth,
  signoutAuth,
} from "../middleware.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  if (!req.session.user) {
    return res.render("home", { title: "Home", notLoggedIn: true });
  } else {
    if (req.session.user.role === "superuser") {
      return res.render("home", { title: "Home", superUser: true });
    } else {
      return res.render("home", { title: "Home", user: true });
    }
  }
});

router
  .route("/register")
  .get(registerPageRedirect, async (req, res) => {
    res.render("register", { title: "Register" });
  })
  .post(async (req, res) => {
    if (req.session.user) return res.redirect("/");
    try {
      const {
        firstName,
        lastName,
        userId,
        password,
        confirmPassword,
        favoriteQuote,
        backgroundColor,
        fontColor,
        role,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !userId ||
        !password ||
        !confirmPassword ||
        !favoriteQuote ||
        !backgroundColor ||
        !fontColor ||
        !role
      ) {
        return res
          .status(400)
          .render("register", {
            title: "Register",
            error: "All fields must be provided.",
          });
      }

      if (
        firstName.trim().length < 2 ||
        firstName.trim().length > 20 ||
        !/^[A-Za-z]+$/.test(firstName.trim())
      )
        throw new Error("Invalid first name.");

      if (
        lastName.trim().length < 2 ||
        lastName.trim().length > 20 ||
        !/^[A-Za-z]+$/.test(lastName.trim())
      )
        throw new Error("Invalid last name.");

      if (
        userId.trim().length < 5 ||
        userId.trim().length > 10 ||
        !/^[A-Za-z0-9]+$/.test(userId.trim())
      )
        throw new Error("Invalid userId.");

      if (
        password.length < 8 ||
        /\s/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/\d/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
      )
        throw new Error("Invalid password format.");

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      if (favoriteQuote.trim().length < 20 || favoriteQuote.trim().length > 255)
        throw new Error("Invalid favorite quote.");

      if (
        !/^#[A-Fa-f0-9]{6}$/.test(backgroundColor) ||
        !/^#[A-Fa-f0-9]{6}$/.test(fontColor)
      )
        throw new Error("Background and font colors must be valid hex codes.");

      if (backgroundColor === fontColor)
        throw new Error("Background and font colors cannot be the same.");

      if (role.toLowerCase() !== "user" && role.toLowerCase() !== "superuser")
        throw new Error("Invalid role.");

      const themePreference = { backgroundColor, fontColor };
      const result = await register(
        firstName,
        lastName,
        userId,
        password,
        favoriteQuote,
        themePreference,
        role
      );

      if (result.registrationCompleted) {
        return res.redirect("/login");
      } else {
        return res
          .status(500)
          .render("error", { title: "Error", error: "Internal Server Error" });
      }
    } catch (e) {
      return res
        .status(400)
        .render("register", { title: "Register", error: e.message });
    }
  });

router
  .route("/login")
  .get(loginPageRedirect, async (req, res) => {
    res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    if (req.session.user) return res.redirect("/");
    try {
      const { userId, password } = req.body;

      if (!userId || !password) {
        return res
          .status(400)
          .render("login", {
            title: "Login",
            error: "All fields must be provided.",
          });
      }

      if (
        userId.trim().length < 5 ||
        userId.trim().length > 10 ||
        !/^[A-Za-z0-9]+$/.test(userId.trim())
      )
        throw new Error("Invalid userId.");

      if (
        password.length < 8 ||
        /\s/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/\d/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
      )
        throw new Error("Invalid password format.");

      const user = await login(userId, password);

      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        favoriteQuote: user.favoriteQuote,
        themePreference: user.themePreference,
        role: user.role,
        signupDate: user.signupDate,
        lastLogin: user.lastLogin,
      };

      if (user.role === "superuser") {
        return res.redirect("/superuser");
      } else {
        return res.redirect("/user");
      }
    } catch (e) {
      return res
        .status(400)
        .render("login", { title: "Login", error: e.message });
    }
  });

router.route("/user")
.get(userAuth, async (req, res) => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = now.toLocaleDateString("en-US");

  res.render("user", {
    title: "User Page",
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    role: req.session.user.role,
    signupDate: req.session.user.signupDate,
    lastLogin: req.session.user.lastLogin,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime,
    currentDate,
    themePreference: req.session.user.themePreference
  });
});

router.route("/superuser").get(superUserAuth, async (req, res) => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = now.toLocaleDateString("en-US");

  res.render("superuser", {
    title: "Superuser Page",
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    signupDate: req.session.user.signupDate,
    lastLogin: req.session.user.lastLogin,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime,
    currentDate,
    themePreference: req.session.user.themePreference
  });
});

router.route("/signout").get(signoutAuth, async (req, res) => {
  req.session.destroy();
  res.clearCookie("AuthenticationState");
  res.render("signout", { title: "Sign Out" });
});

export default router;
