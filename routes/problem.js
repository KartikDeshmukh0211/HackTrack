const express = require("express");
const router = express.Router();

const Problem = require("../models/problem.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { problemSchema } = require("../schema.js");

const { isLoggedIn, isOwner } = require("../middleware.js");

const validataProblem = (req, res, next) => {
  let result = problemSchema.validate(req.body);
  // console.log(result)
  if (result.error) {
    const err = new Error(result.error.message);
    err.statusCode = 404; // Set status code
    next(err);
  } else {
    next();
  }
};

// INDEX ROUTE
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allProblems = await Problem.find();
    res.render("./problems/problem.ejs", { allProblems });
  })
);

// NEW ROUTE
router.get("/new",isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

// SHOW ROUTE
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    if (!problem) {
      req.flash("failure", "Problem doesn't exist");
      res.redirect("/problems");
    }
    res.render("./problems/problem_detail.ejs", { problem });
  })
);

// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    if (!problem) {
      req.flash("failure", "Problem doesn't exist");
      res.redirect("/problems");
    }
    res.render("edit.ejs", { problem });
  })
);

//UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validataProblem,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newProblem = req.body.problem;
    await Problem.findByIdAndUpdate(id, newProblem, {
      new: true,
    });
    req.flash("success", "problem updated");
    res.redirect("/problems");
  })
);

// CREATE ROUTE
router.post(
  "/",
  isLoggedIn,
  validataProblem,
  wrapAsync(async (req, res, next) => {
    let data = req.body.problem;
    data.owner = req.user;
    await Problem.insertOne(data);
    req.flash("success", "new problem added");
    res.redirect("/problems");
  })
);

// DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Problem.findByIdAndDelete(id);
    req.flash("success", "problem deleted");
    res.redirect("/problems");
  })
);

module.exports = router;
