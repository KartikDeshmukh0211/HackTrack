const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Solution = require("../models/solution.js");
const { isLoggedIn, isSolutionOwner } = require("../middleware.js");
const Problem = require("../models/problem.js");

// INDEX ROUTE
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allSolutions = await Solution.find();
    //   console.log(allSolutions);
    res.render("solutions/solution.ejs", { allSolutions });
  })
);

// NEW ROUTE
// FOR INDEPENDENT SOLUTION
router.get("/new", isLoggedIn, (req, res) => {
  res.render("solutions/new_solution.ejs");
});

// NEW ROUTE
// FOR DEPENDENT SOLUTION
router.get("/:id/new", isLoggedIn, (req, res) => {
  let { id } = req.params;
  res.render("solutions/new_solution_dependent.ejs", { id });
});

// SHOW ROUTE
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { problemId } = req.query;
    let solution = await Solution.findById(id);
    if (!solution) {
      req.flash("failure", "Solution doesn't exist");
      res.redirect("/solutions");
    }
    res.render("solutions/solution_detail.ejs", { solution, problemId });
  })
);

// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isSolutionOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let solution = await Solution.findById(id);
    if (!solution) {
      req.flash("failure", "Solution doesn't exist");
      res.redirect("/solutions");
    }
    res.render("solutions/edit_solution.ejs", { solution });
  })
);

// UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isSolutionOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newSolution = req.body.solution;
    await Solution.findByIdAndUpdate(id, newSolution, { new: true });
    req.flash("success", "Solution updated successfully");
    res.redirect("/solutions");
  })
);

// CREATE ROUTE
// FOR INDEPENDENT SOLUTION
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let solution = req.body.solution;
    solution.owner = req.user;
    await Solution.insertOne(solution);
    req.flash("success", "Soltion added successfully");
    res.redirect("/solutions");
  })
);

// CREATE ROUTE
// FOR DEPENDENT SOLUTION
router.post(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    let solution = new Solution(req.body.solution);

    solution.owner = req.user;
    problem.solutions.push(solution);

    await solution.save();
    await problem.save();

    req.flash("success", "Soltion added successfully");
    res.redirect(`/problems/${id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isSolutionOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { problemId } = req.query;
    if (problemId) {
      await Problem.findByIdAndUpdate(problemId, { $pull: { solutions: id } });
    }
    await Solution.findByIdAndDelete(id);
    req.flash("success", "Solution deleted");
    res.redirect("/solutions");
  })
);

module.exports = router;
