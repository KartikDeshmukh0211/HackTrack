const express = require("express")
const router = express.Router();

router.get("/", (req, res) => {
    res.render("solutions/solution.ejs")
})

module.exports = router;