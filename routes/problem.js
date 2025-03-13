const express = require("express");
const router = express.Router();

const Problem = require("../models/problem.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { problemSchema } = require("../schema.js");

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
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW ROUTE
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    res.render("./problems/problem_detail.ejs", { problem });
  })
);

// EDIT ROUTE
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    res.render("edit.ejs", { problem });
  })
);

//UPDATE ROUTE
router.put(
  "/:id",
  validataProblem,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newProblem = req.body.problem;
    let problem = await Problem.findByIdAndUpdate(id, newProblem, {
      new: true,
    });
    res.redirect("/problems");
  })
);

// CREATE ROUTE
router.post(
  "/",
  validataProblem,
  wrapAsync(async (req, res, next) => {
    let data = req.body.problem;
    await Problem.insertOne(data);
    res.redirect("/problems");
  })
);

// DELETE ROUTE
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Problem.findByIdAndDelete(id);
    res.redirect("/problems");
  })
);

module.exports = router;
