const express = require("express");
const morgan = require("morgan");
const app = express();

const { db } = require("./models");
const userRouter = require("./routes/user.js");
const wikiRouter = require("./routes/wiki.js");
// console.log(data.db);

app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);
app.use("/user", userRouter);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const init = async () => {
  await db.sync({
    force: true
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

init();
