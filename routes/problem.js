const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validataProblem } = require("../middleware.js");

/* here we are requiring the complete file so while using it we also need to specify which function we are using.*/
const listingController = require("../controllers/problem.js");

// INDEX ROUTE
router.get("/", wrapAsync(listingController.index));

// NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE
router.get("/:id", wrapAsync(listingController.showProblem));

// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editProblem)
);

//UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validataProblem,
  wrapAsync(listingController.updateProblem)
);

// CREATE ROUTE
router.post(
  "/",
  isLoggedIn,
  validataProblem,
  wrapAsync(listingController.createProblem)
);

// DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyProblem)
);

module.exports = router;
