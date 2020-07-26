var express = require("express"),
    router = express.Router(),
    constants = require("../constants.js"),
    querystring = require("querystring"),
    spotifyAPI = require("../API/spotify"),
    stateKey = "spotify_auth_state";


// Login route redirects to spotify login
router.get("/login", function (req, res) {
    // This provides protection against attacks such as cross-site request forgery
    var state = spotifyAPI.generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = spotifyAPI.scopes;
    // Redirect to spotify"s authorize
    res.redirect(constants.AUTHORIZE_ENDPOINT +
        querystring.stringify({
            response_type: "code",
            client_id: constants.CLIENT_ID,
            scope: scope,
            redirect_uri: constants.REDIRECT_URI,
            state: state
        }));
});

// Callback route
router.get("/callback", async function (req, res) {
    var code = req.query.code;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null
    if (code && spotifyAPI.compareStates(state, storedState)) {
        // State key no longer needed
        res.clearCookie(stateKey);
        try {
            var response = await spotifyAPI.requestSpotifyToken(code);
            // Set access token cookie and API config
            spotifyAPI.setAccessToken(response.data.access_token);
            res.cookie("access_token", response.data.access_token, { httpOnly: true });
            res.cookie("refresh_token", response.data.refresh_token, { httpOnly: true });
            res.redirect("/playlists");
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    } else {
        // TODO: Tell user they must allow access
        res.redirect("/");
    }
});

module.exports = router;