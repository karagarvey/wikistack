const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: Sequelize.STRING,
  slug: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  content: Sequelize.STRING,
  type: Sequelize.ENUM("open", "closed")
});

const User = db.define("user", {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

module.exports = { db, Page, User };
