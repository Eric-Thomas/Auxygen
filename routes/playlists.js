var express = require("express"),
    router = express.Router(),
    constants = require("../constants"),
    querystring = require("querystring"),
    spotifyAPI = require("../API/spotify")

// INDEX - Show all playlist utilities
router.get("/", function (req, res) {
    res.render("playlists/index");
});

// Get top songs
router.get("/top_songs/:time_range", function (req, res) {
    spotifyAPI.requestTopSongs(req.params.time_range)
        .then(function (response) {
            // Change from api query to more readable language
            var timeRange = transformTimeRange(req.params.time_range)
            res.render("playlists/top_songs", { timeRange: timeRange, songs: response.data.items })
        }).catch(function (err) {
            // TODO: See if we need to refresh token
            console.log(err)
            res.redirect("/playlists")
        })
});

// CREATE - Create playlist with users top songs
router.post("/top_songs/:time_range", function (req, res) {
    res.send("create playlist for " + req.params.time_range)
})

function transformTimeRange(timeRange) {
    var transform = {
        short_term: "last month",
        medium_term: "last 6 months",
        long_term: "all time"
    }
    return transform[timeRange]
}

module.exports = router;