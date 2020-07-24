var express = require("express"),
    router = express.Router();

// INDEX - Show all playlist utilities
router.get("/", function (req, res) {
    res.render("./playlists");
})

module.exports = router;