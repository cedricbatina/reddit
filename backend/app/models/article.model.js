// creating the article model. the id, and created and updated times will be provided automatically by mysql

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
