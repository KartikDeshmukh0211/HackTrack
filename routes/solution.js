const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Solution = require("../models/solution.js");
const { isLoggedIn, isSolutionOwner } = require("../middleware.js");

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
router.get("/new", isLoggedIn, (req, res) => {
  res.render("solutions/new_solution.ejs");
});

// SHOW ROUTE
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let solution = await Solution.findById(id);
    if (!solution) {
      req.flash("failure", "Solution doesn't exist");
      res.redirect("/solutions");
    }
    res.render("solutions/solution_detail.ejs", { solution });
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
    req.flash("success", "Solution updated successfully")
    res.redirect("/solutions");
  })
);

// CREATE ROUTE
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

router.delete(
  "/:id",
  isLoggedIn,
  isSolutionOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Solution.findByIdAndDelete(id);
    req.flash("success", "Solution deleted")
    res.redirect("/solutions");
  })
);

module.exports = router;
