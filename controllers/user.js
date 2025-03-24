const User = require("../models/user");

module.exports.renderSignupFrom = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signupUser = async (req, res) => {
  try {
    let username = req.body.firstName + req.body.lastName;
    let { email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User signuped successfully");
      let url = res.locals.redirectUrl || "/";
      res.redirect(url);
    });
  } catch (err) {
    // console.log(err);
    // console.log(err.message);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = (req, res) => {
  // console.log(req.user);
  req.flash("success", "You LoggedIn successfully");
  let url = res.locals.redirectUrl || "/";
  res.redirect(url);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });
};
