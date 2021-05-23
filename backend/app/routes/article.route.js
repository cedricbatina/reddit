const articles = require("../controllers/articleController");
const { onlyArticleByUser } = require("../middleware");

module.exports = function (app) {
  app.post("/api/articles", articles.createArticle);

  app.get("/api/articles", articles.findAll);

  app.get("/api/articles/:id", articles.getOneArticle);
  app.put("/api/articles/update/:id", articles.modifyArticle);

  app.delete("/api/articles/delete/:id", articles.deleteArticle);
};
