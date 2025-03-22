const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  description : String,
  image: String,
  posted_by: String,
  category: String,
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
  }
});

const Problem = new mongoose.model("Problem", problemSchema);

module.exports = Problem;
