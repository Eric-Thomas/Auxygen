var constants = require("../constants"),
    axios = require("axios")

function isSpotifyAuthenticated(req, res, next) {
    // We have user spotify tokens
    if (hasTokenCookies(req)) {
        next();
    }
    else {
        // TODO: Connect flash
        console.log("not spotify authenticated");
        res.redirect("/");
    }
}

async function populateUserInfo(req, res, next) {
    // Save profile cookies if we dont have them
    if (!req.cookies.spotify_profile) {
        // Make user we have api tokens
        if (hasTokenCookies(req)) {
            var url = constants.PROFILE_ENDPOINT;
            var config = {
                headers: {
                    Authorization: "Bearer " + req.cookies.access_token
                }
            }
            try {
                response = await axios.get(url, config)
                res.cookie("spotify_profile", response.data)
                res.locals.spotifyProfile = response.data
                console.log("locals saved")
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        res.locals.spotifyProfile = req.cookies.spotify_profile;
    }
    next();
}

function hasTokenCookies(req) {
    return req.cookies.access_token && req.cookies.refresh_token
}


module.exports = {
    isSpotifyAuthenticated: isSpotifyAuthenticated,
    populateUserInfo: populateUserInfo
}