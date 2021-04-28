//const articles = require("../controllers/article.controller");
const articles = require("../controllers/articleController");
const comments = require("../controllers/commentController");
const allRights = require("../middleware/authJwt");

module.exports = function (app) {
  app.post("/api/articles", articles.createArticle);
  //app.post("/api/articles", articles.create);
  //app.get("/api/articles", articles.getAllArticles);
  app.get("/api/articles", articles.findAll);
  app.get("/api/articles", articles.findAllArticlesByUser);
  app.get("/api/articles/:id", articles.getOneArticle);
  //app.get("/api/articles", articles.findOne);
  app.put("/api/articles/:id", articles.modifyArticle);
  //app.put("/api/articles/:id", articles.update);
  //app.get("/api/articles", articles.findAllPublished);
  app.delete("/api/articles/:id", articles.deleteArticle);
  //app.delete("/api/articles/:id", articles.delete);
  // app.delete("/api/articles/", articles.deleteAll);
  //app.delete("/api/articles/", articles.deleteAll);
};
