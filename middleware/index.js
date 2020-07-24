var constants = require("constants");

function isSpotifyAuthenticated(req, res, next) {
    // We have user spotify tokens
    if (req.cookies.access_token && req.cookies.refresh_token) {
        // Populate user info if we don't have it
        if (!res.locals.spotifyProfile) {
            populateUserInfo(req, res);
        }
        next();
    }
    else {
        // TODO: Connect flash
        console.log("not spotify authenticated");
        res.redirect("/");
    }
}

function populateUserInfo(req, res) {

}

module.exports = {
    isSpotifyAuthenticated: isSpotifyAuthenticated
}