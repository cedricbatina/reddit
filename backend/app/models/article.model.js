//const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    userName: {
      type: Sequelize.STRING(35),
    },
  });
  return Article;
};
