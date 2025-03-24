const express = require("express");
const router = express.Router();

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// RENDER SIGNUP FORM
router.get("/signup", userController.renderSignupFrom);

// SIGNUP ROUTE
router.post("/signup",saveRedirectUrl, userController.signupUser);

// RENDER LOGIN FORM
router.get("/login", userController.renderLoginForm);

// LOGIN ROUTE
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginUser
);

// LOGOUT ROUTE
router.get("/logout", userController.logoutUser);

module.exports = router;
