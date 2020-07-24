var express = require("express"),
    router = express.Router(),
    constants = require("../constants.js"),
    querystring = require("querystring"),
    axios = require("axios"),
    stateKey = "spotify_auth_state";


// Login route redirects to spotify login
router.get("/login", function (req, res) {
    // This provides protection against attacks such as cross-site request forgery
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = getScopes();
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
    if (code && statesMatch(req)) {
        // State key no longer needed
        res.clearCookie(stateKey);
        try {
            var response = await getSpotifyToken(code);
            res.cookie("access_token", response.data.access_token, { httpOnly: true });
            res.cookie("refresh_token", response.data.refresh_token, { httpOnly: true });
            res.redirect("/playlists");
        } catch (err) {
            console.log("error")
            res.send(err)
        }
    } else {
        // TODO: Tell user they must allow access
        res.redirect("/");
    }
});



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/**
 * Getter for scopes needed for Auxygen
 * @return {string} Space seperated list of scopes
 */
function getScopes() {
    // Modify playback state for collaborative listening
    var scope = "user-modify-playback-state";
    // Read all playlists
    scope += " playlist-read-collaborative"
    scope += " playlist-read-private";
    // Read saved songs
    scope += " user-library-read";
    // Read top artists and tracks
    scope += " user-top-read";
    return scope;
}

function statesMatch(req) {
    // State to protect against attacks such as cross-site request forgery
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    // If states don't match or no state is returned
    return state !== null && state === storedState
}

function getSpotifyToken(code) {
    var data = querystring.stringify({
        code: code,
        redirect_uri: constants.REDIRECT_URI,
        grant_type: "authorization_code"
    });
    var config = {
        headers: {
            // Base 64 encode client ID and Secret
            "Authorization": "Basic " + (Buffer.from(constants.CLIENT_ID + ":" + constants.CLIENT_SECRET).toString("base64")),
            "Content-type": "application/x-www-form-urlencoded"
        }
    }

    // Ask for access token and refresh token
    var url = constants.TOKEN_ENDPOINT;
    return axios.post(url, data, config);
}

module.exports = router;