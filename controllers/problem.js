const Problem = require("../models/problem");

module.exports.index = async (req, res) => {
  let allProblems = await Problem.find();
  res.render("./problems/problem.ejs", { allProblems });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};

module.exports.showProblem = async (req, res) => {
  let { id } = req.params;
  let problem = await Problem.findById(id);
  if (!problem) {
    req.flash("failure", "Problem doesn't exist");
    res.redirect("/problems");
  }
  res.render("./problems/problem_detail.ejs", { problem });
};

module.exports.editProblem = async (req, res) => {
  let { id } = req.params;
  let problem = await Problem.findById(id);
  if (!problem) {
    req.flash("failure", "Problem doesn't exist");
    res.redirect("/problems");
  }
  res.render("edit.ejs", { problem });
};

module.exports.updateProblem = async (req, res) => {
  let { id } = req.params;
  let newProblem = req.body.problem;
  await Problem.findByIdAndUpdate(id, newProblem, {
    new: true,
  });
  req.flash("success", "problem updated");
  res.redirect("/problems");
};

module.exports.createProblem = async (req, res, next) => {
  let data = req.body.problem;
  data.owner = req.user;
  await Problem.insertOne(data);
  req.flash("success", "new problem added");
  res.redirect("/problems");
};

module.exports.destroyProblem = async (req, res) => {
  let { id } = req.params;
  await Problem.findByIdAndDelete(id);
  req.flash("success", "problem deleted");
  res.redirect("/problems");
};
