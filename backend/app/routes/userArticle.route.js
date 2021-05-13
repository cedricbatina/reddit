//const articles = require("../controllers/article.controller");
const userArticles = require("../controllers/userArticleController");

module.exports = function (app) {
  app.get("/api/articles/user/:userId", userArticles.findAllArticlesByUser);
};
