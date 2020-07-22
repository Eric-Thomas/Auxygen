var express = require("express"),
  cookieParser = require("cookie-parser"),
  middleware = require("./middleware");
port = 3000;

var app = express();

// Require routes
var indexRoutes = require("./routes/index");
var spotifyAuthRoutes = require("./routes/spotify_auth");
var playlistRoutes = require("./routes/playlists");

// App settings config
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
  .use(cookieParser());

// Route prefixes
app.use("/", indexRoutes);
app.use("/spotify_auth", spotifyAuthRoutes);
app.use("/playlists", middleware.isSpotifyAuthenticated, playlistRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
