const Problem = require("./models/problem.js");
const { problemSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  // console.log(res.locals.currUser);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You are not loggedIn!!");
    return res.redirect("/login");
  }
  next();
};

// this middleware will store the redirectUrl if it is present.
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let problem = await Problem.findById(id);

  if (!problem.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don,t have access to make changes here");
    return res.redirect(`/problems/${id}`);
  }
  next();
};

module.exports.validataProblem = (req, res, next) => {
  let result = problemSchema.validate(req.body);

  if (result.error) {
    const err = new Error(result.error.message);
    err.statusCode = 404; // Set status code
    next(err);
  } else {
    next();
  }
};
