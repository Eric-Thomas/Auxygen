var express = require("express");
var router = express.Router();

// Root route
router.get("/", function (req, res) {
  res.render("landing");
});

router.get("/home", function (req, res) {
  res.send("home");
})

module.exports = router;
