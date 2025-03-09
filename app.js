// This is going to be the server file

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Problem = require("./models/problem.js");

let port = 3000;

main()
  .then((res) => {
    console.log("successfully connected to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // for reading the body of request when comed via post route.
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.send("app is working");
});

// INDEX ROUTE
app.get("/problem", async (req, res) => {
  let allProblems = await Problem.find();
  // console.log(allProblems);
  res.render("index.ejs", { allProblems });
});

// NEW ROUTE
app.get("/problem/new", (req, res) => {
  res.render("new.ejs");
});

// EDIT ROUTE
app.get("/problem/:id/edit", async (req, res) => {
  let { id } = req.params;
  let problem = await Problem.findById(id);
  res.render("edit.ejs", { problem });
});

//UPDATE ROUTE
app.put("/problem/:id", async (req, res) => {
  let { id } = req.params;
  let newProblem = req.body.problem;
  let problem = await Problem.findByIdAndUpdate(id, newProblem, { new: true });
  // console.log(problem);
  res.redirect("/problem");
});

// CREATE ROUTE
app.post("/problem", async (req, res) => {
  let data = req.body.problem;
  // console.log(data);
  await Problem.insertOne(data);
  res.redirect("/problem");
});

// DELETE ROUTE
app.delete("/problem/:id", async (req, res) => {
  let { id } = req.params;
  await Problem.findByIdAndDelete(id);
  res.redirect("/problem");
});

// app.get("/testing", async (req, res) => {
//   const dummyData = Problem({
//     title: "problem1",
//     author: "Kartik",
//     rating: 45,
//   });

//   await dummyData.save();
//   res.send("success");
// });

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
