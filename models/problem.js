const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  description : String,
  image: String,
  posted_by: String,
  category: String,
});

const Problem = new mongoose.model("Problem", problemSchema);

module.exports = Problem;
