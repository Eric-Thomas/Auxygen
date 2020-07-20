var express = require("express");
var router = express.Router();

// Root route
router.get("/", function (req, res) {
  res.render("landing");
});

module.exports = router;
