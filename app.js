var express = require("express"),
  port = 3000;

var app = express();

// Require routes
var indexRoutes = require("./routes/index");

// App settings config
app.set("view engine", "ejs");

// Route prefixes
app.use("/", indexRoutes);




app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
