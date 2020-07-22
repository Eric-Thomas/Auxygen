function isSpotifyAuthenticated(req, res, next) {
    // We have user spotify tokens
    if (req.cookies.access_token && req.cookies.refresh_token) {
        next();
    }
    else {
        // TODO: Connect flash
        console.log("not spotify authenticated");
        res.redirect("/");
    }

}

module.exports = {
    isSpotifyAuthenticated: isSpotifyAuthenticated
}