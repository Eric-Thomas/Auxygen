var express = require("express");
var router = express.Router();

// Root route
router.get("/", function (req, res) {
  res.render("landing");
});

router.get("/callback", function (req, res) {
  res.send("yay callback");
})

module.exports = router;
