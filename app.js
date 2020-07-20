var express = require("express"),
  port = 3000;

var app = express();

// Require routes
var indexRoutes = require("./routes/index");
var spotifyAuthRoutes = require("./routes/spotify_auth");

// App settings config
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Route prefixes
app.use("/", indexRoutes);
app.use("/spotify_auth", spotifyAuthRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});