const { ref } = require("joi");
const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  solution_title: String,
  solution_breakdown: String,
  approach: String,
  benefits: String,
  potential_impacts: String,
  category: String,
  image: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});

const Solution = new mongoose.model("Solution", solutionSchema);

module.exports = Solution;
