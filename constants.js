module.exports = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: "http://localhost:3000/spotify_auth/callback",
    PROFILE_ENDPOINT: "https://api.spotify.com/v1/me"
}