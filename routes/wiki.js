const express = require("express");
const router = express.Router();
const views = require("../views");
const { Page } = require("../models");

router.get("/add", (req, res, next) => {
  try {
    res.send(views.addPage());
  } catch (err) {
    next(err);
  }
});
router.get("/", (req, res, next) => {
  try {
    res.send("got to GET /wiki/");
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const slug = title
    .split(" ")
    .join("-")
    .slice(0, 10);
  const page = Page.build({
    title: title,
    content: content,
    status: status,
    slug: slug
  });
  try {
    await page.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
