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
const { problemSchema } = require("./schema.js");

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

const validataProblem = (req, res, next) => {
  let result = problemSchema.validate(req.body);
  // console.log(result)
  if (result.error) {
    const err = new Error(result.error.message);
    err.statusCode = 404; // Set status code
    next(err);
  } else {
    next();
  }
};

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
    // console.log(allProblems);
    res.render("index.ejs", { allProblems });
  })
);

app.get(
  "/problems",
  wrapAsync(async (req, res) => {
    let allProblems = await Problem.find();
    // console.log(allProblems);
    res.render("./problems/problem.ejs", { allProblems });
  })
);

// NEW ROUTE
app.get("/problems/new", (req, res) => {
  res.render("new.ejs");
});

app.get(
  "/problems/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    // console.log(problem);
    res.render("./problems/problem_detail.ejs", { problem });
  })
);

// EDIT ROUTE
app.get(
  "/problems/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let problem = await Problem.findById(id);
    res.render("edit.ejs", { problem });
  })
);

//UPDATE ROUTE
app.put(
  "/problem/:id",
  validataProblem,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newProblem = req.body.problem;
    let problem = await Problem.findByIdAndUpdate(id, newProblem, {
      new: true,
    });
    // console.log(problem);
    res.redirect("/problems");
  })
);

// CREATE ROUTE
app.post(
  "/problems",
  validataProblem,
  wrapAsync(async (req, res, next) => {
    let data = req.body.problem;
    // console.log(data);
    await Problem.insertOne(data);
    res.redirect("/problems");
    // res.send("done");
  })
);

// DELETE ROUTE
app.delete(
  "/problems/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Problem.findByIdAndDelete(id);
    res.redirect("/problems");
  })
);

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

app.use((err, req, res, next) => {
  let { statusCode = 500, message, stack } = err;
  res.status(statusCode).render("error.ejs", { message, statusCode, stack });
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
