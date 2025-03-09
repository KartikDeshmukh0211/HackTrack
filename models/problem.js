const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  description : String,
  category: String,
  difficulty: String,
  postedBy: String,
});

const Problem = new mongoose.model("Problem", problemSchema);

module.exports = Problem;
