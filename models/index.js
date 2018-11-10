const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const SequelizeSlugify = require("sequelize-slugify");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    unique: true
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: Sequelize.ENUM("open", "closed")
});

SequelizeSlugify.slugifyModel(Page, {
  source: ["title"]
});
const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: "author" });

module.exports = { db, Page, User };
