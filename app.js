const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout.js");
const data = require("./models");
const userRouter = require("./routes/user.js");
const wikiRouter = require("./routes/wiki.js");
// console.log(data.db);

app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);
app.use("/user", userRouter);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

data.db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(layout(""));
});

const init = async () => {
  await data.db.sync()

  const port = 8080;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

init()
