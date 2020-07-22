var express = require("express"),
    router = express.Router();

router.get("/playlists", function (req, res) {
    res.send("playlists");
})

module.exports = router;