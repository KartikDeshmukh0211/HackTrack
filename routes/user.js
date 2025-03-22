const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    let username = req.body.firstName + req.body.lastName;
    let { email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User signuped successfully");
      res.redirect("/home");
    });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    // console.log(req.user);
    req.flash("success", "You LoggedIn successfully");
    let url = res.locals.redirectUrl || "/home";
    res.redirect(url);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/home");
  });
});

module.exports = router;
