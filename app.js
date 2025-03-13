// This is going to be the server file

if (process.env.NODE_ENV != "production") {
  require("dotenv").config(); // dotenv is used to access the env variable
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Problem = require("./models/problem.js");
const wrapAsync = require("./utils/wrapAsync.js");

const problems = require("./routes/problem.js");

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
// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })

app.get("/", (req, res) => {
  res.send("app is working");
});

app.get("/solution", (req, res) => {
  res.render("solution.ejs");
});

// INDEX ROUTE
app.get(
  "/home",
  wrapAsync(async (req, res) => {
    let allProblems = await Problem.find();
    res.render("index.ejs", { allProblems });
  })
);

app.use("/problems", problems);

// app.get("/testing", async (req, res) => {
//   const dummyData = Problem({
//     title: "problem1",
//     author: "Kartik",
//     rating: 45,
//   });

//   await dummyData.save();
//   res.send("success");
// });

// app.get("/error", (req, res) => {
//   res.render("error.ejs")
// })

app.all("*", (req, res, next) => {
  // next(new Error("Page not found"));
  const err = new Error("Page not found");
  err.statusCode = 404; // Set status code
  next(err);
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  let { statusCode = 500, message, stack } = err;
  res.status(statusCode).render("error.ejs", { message, statusCode, stack });
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
