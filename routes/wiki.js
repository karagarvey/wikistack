const express = require("express");
const router = express.Router();
router.get("/add", (req, res, next) => {
  try {
    res.send("got to GET /wiki/add");
  } catch (err) {
    next(err);
  }
});
router.get("/", (req, res, next) => {
  try {
    res.send("got to GET /wiki");
  } catch (err) {
    next(err);
  }
});
router.post("/", (req, res, next) => {
  try {
    res.send("got to POST /wiki");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
