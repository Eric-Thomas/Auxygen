var constants = require("../constants"),
    querystring = require("querystring"),
    axios = require("axios");


// Create axios instance for spotify authorization
var spotifyAPI = axios.create({
    headers: {
        "Authorization": "Basic " + (Buffer.from(constants.CLIENT_ID + ":" + constants.CLIENT_SECRET).toString("base64")),
        "Content-type": "application/x-www-form-urlencoded"
    }
})

function setAccessToken(token) {
    spotifyAPI.defaults.headers["Authorization"] = "Bearer " + token;
}

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

function requestSpotifyToken(code) {
    var data = querystring.stringify({
        code: code,
        redirect_uri: constants.REDIRECT_URI,
        grant_type: "authorization_code"
    });

    // Ask for access token and refresh token
    var url = constants.TOKEN_ENDPOINT;
    return spotifyAPI.post(url, data);
}

function requestUserInfo() {
    var url = constants.PROFILE_ENDPOINT;
    return spotifyAPI.get(url)
}


function compareStates(state, storedState) {
    // If states don't match or no state is returned
    return state !== null && storedState !== null && state === storedState
}

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

module.exports = {
    scopes: getScopes(),
    requestSpotifyToken: requestSpotifyToken,
    compareStates: compareStates,
    generateRandomString: generateRandomString,
    setAccessToken: setAccessToken,
    requestUserInfo: requestUserInfo
}

