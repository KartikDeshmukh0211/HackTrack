const mongoose = require("mongoose");
const Problem = require("../models/problem");
const sampleProblems = require("./data.js");

main()
  .then((res) => {
    console.log("successfully connected to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hacktrack");
}

const initialiseDB = async () => {
  await Problem.deleteMany({});
  await Problem.insertMany(sampleProblems);
};

initialiseDB();