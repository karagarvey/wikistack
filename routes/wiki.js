const express = require("express");
const router = express.Router();
const { addPage, main, wikiPage } = require("../views");
const { Page, User } = require("../models");

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const currentPage = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const currentUser = await currentPage.getAuthor();
    res.send(wikiPage(currentPage, currentUser));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
