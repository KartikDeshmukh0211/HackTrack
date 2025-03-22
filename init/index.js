// require('dotenv').config()
console.log(process.env.MONGO_URL)

const mongoose = require("mongoose");
const Problem = require("../models/problem");
const sampleProblems = require("./data.js");
const User = require("../models/user.js");

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
  await User.deleteMany({});
  const newUser = new User({
    email: "kartikdeshmukh58",
    username: "Kartik Deshmukh",
  });
  // console.log(process.env.DUMMY_PASSWORD);
  const registeredUser = await User.register(
    newUser,
    "123456789"
  );
  const updatedData = sampleProblems.map((ele) => {
    return { ...ele, owner: registeredUser._id };
  });
  await Problem.insertMany(updatedData);
};

initialiseDB();
