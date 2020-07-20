var express = require("express"),
  port = 3000;

var app = express();

app.get("/", function (req, res) {
  res.send("Home page");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
