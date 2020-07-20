var express = require("express"),
    router = express.Router(),
    Constants = require("../constants.js"),
    querystring = require("querystring");

var stateKey = "spotify_auth_state";


router.get("/login", function (req, res) {
    // This provides protection against attacks such as cross-site request forgery
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = getScopes();
    // Redirect to spotify's authorize
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: Constants.client_id,
            scope: scope,
            redirect_uri: Constants.redirect_uri,
            state: state
        }));
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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