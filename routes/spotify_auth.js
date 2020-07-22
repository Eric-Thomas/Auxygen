var express = require("express"),
    router = express.Router(),
    Constants = require("../constants.js"),
    querystring = require("querystring"),
    request = require("request"),
    stateKey = "spotify_auth_state";


// Login route redirects to spotify login
router.get("/login", function (req, res) {
    // This provides protection against attacks such as cross-site request forgery
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = getScopes();
    // Redirect to spotify"s authorize
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: Constants.CLIENT_ID,
            scope: scope,
            redirect_uri: Constants.REDIRECT_URI,
            state: state
        }));
});

// Callback route
router.get("/callback", function (req, res) {
    // Code returned from spotify used to get access token
    var code = req.query.code || null;
    // State to protect against attacks such as cross-site request forgery
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    // If states don"t match for some reason
    if (state === null || state !== storedState) {
        // TODO: Set up connect flash to let user know
        res.redirect("/");
    } else {
        // State key no longer needed
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: Constants.REDIRECT_URI,
                grant_type: "authorization_code"
            },
            headers: {
                // Base 64 encode client ID and Secret
                "Authorization": "Basic " + (Buffer.from(Constants.CLIENT_ID + ":" + Constants.CLIENT_SECRET).toString("base64"))
            },
            json: true
        };
        // Ask for access token and refresh token
        request.post(authOptions, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                var access_token = body.access_token;
                var refresh_token = body.refresh_token;
                // Set cookies and don't allow client side read
                res.cookie("access_token", access_token, { httpOnly: true });
                res.cookie("refresh_token", refresh_token, { httpOnly: true });
                res.redirect("/home");
            } else {
                res.send(response);
            }
        })
    }
})



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

module.exports = router;