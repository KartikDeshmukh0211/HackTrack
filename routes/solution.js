const express = require("express");
const router = express.Router();

const Solution = require("../models/solution.js");

router.get("/", async (req, res) => {
  const allSolutions = await Solution.find();
  //   console.log(allSolutions);
  res.render("solutions/solution.ejs", { allSolutions });
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let solution = await Solution.findById(id);
//   console.log(solution);
  res.render("solutions/solution_detail.ejs", { solution });
});

module.exports = router;
