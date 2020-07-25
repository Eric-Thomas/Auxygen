var express = require("express"),
    router = express.Router(),
    axios = require("axios"),
    constants = require("../constants"),
    querystring = require("querystring")

// INDEX - Show all playlist utilities
router.get("/", function (req, res) {
    res.render("playlists/index");
});

// Get top songs
router.get("/top_songs/:time_range", function (req, res) {
    var url = constants.TOP_ENDPOINT + "tracks?" + querystring.stringify({
        limit: 50,
        time_range: req.params.time_range
    });

    var config = {
        headers: {
            "Authorization": "Bearer " + req.cookies.access_token,
            "Content-type": "application/x-www-form-urlencoded"
        }
    }
    axios.get(url, config)
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

function transformTimeRange(timeRange) {
    var transform = {
        short_term: "last month",
        medium_term: "last 6 months",
        long_term: "all time"
    }
    return transform[timeRange]
}

module.exports = router;