var express = require("express"),
    router = express.Router();

// INDEX - Show all playlist utilities
router.get("/", function (req, res) {
    console.log(res.locals)
    res.render("./playlists");
})

module.exports = router;