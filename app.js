const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout.js");
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/main", require("./views/main.js"));

app.get("/", (req, res) => {
  res.send(layout(""));
});

const port = 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
