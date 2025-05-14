/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/
export const logger = (req, res, next) => {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const path = req.originalUrl;
  let authStatus = "(Non-Authenticated)";

  if (req.session.user) {
    authStatus = `(Authenticated ${
      req.session.user.role === "superuser" ? "Super User" : "User"
    })`;
  }

  console.log(`[${timestamp}]: ${method} ${path} ${authStatus}`);
  next();
};

export const loginPageRedirect = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "superuser") {
      return res.redirect("/superuser");
    } else {
      return res.redirect("/user");
    }
  }
  next();
};

export const registerPageRedirect = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "superuser") {
      return res.redirect("/superuser");
    } else {
      return res.redirect("/user");
    }
  }
  next();
};

export const userAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

export const superUserAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  if (req.session.user.role !== "superuser") {
    res.status(403).render("error", {
      title: "Forbidden",
      error: "You do not have permission to view this page.",
      link: "/user",
    });
    return;
  }
  next();
};

export const signoutAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};
