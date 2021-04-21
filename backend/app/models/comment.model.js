// creating a comment table on the database. One comment shall be linked to an article

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
    userName: {
      type: Sequelize.STRING(35),
    },
  });
  return Comment;
};
