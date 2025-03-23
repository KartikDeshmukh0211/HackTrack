const express = require("express");
const router = express.Router();

const Solution = require("../models/solution.js");

router.get("/", async (req, res) => {
  const allSolutions = await Solution.find();
  //   console.log(allSolutions);
  res.render("solutions/solution.ejs", { allSolutions });
});

router.get("/new", (req, res) => {
  res.render("solutions/new_solution.ejs");
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let solution = await Solution.findById(id);
  //   console.log(solution);
  res.render("solutions/solution_detail.ejs", { solution });
});

router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let solution = await Solution.findById(id);
  res.render("solutions/edit_solution.ejs", { solution });
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let newSolution = req.body.solution;
  await Solution.findByIdAndUpdate(id, newSolution, { new: true });
  res.redirect("/solutions");
});

router.post("/", async (req, res) => {
  let solution = req.body.solution;
  await Solution.insertOne(solution);
  // req.flash("success", "Soltion added successfully");
  res.redirect("/solutions");
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  await Solution.findByIdAndDelete(id);
  res.redirect("/solutions");
});

module.exports = router;
