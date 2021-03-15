// creating a comment table on the database. One comment shall be linked to an article
const Sequelize = require("sequelize");
const { sequelize } = require("../config/db.config");
//const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    text: {
      type: Sequelize.TEXT,
    },
    articleId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
  });
  return Comment;
};
