module.exports = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    AUTH_REDIRECT_URI: 'http://localhost:3000/spotify_auth/callback',
    TOKEN_REDIRECT_URI: 'http://localhost:3000/home'
}