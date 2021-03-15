const comments = require("../controllers/comment.controller");
const articles = require("../controllers/articleController");

module.exports = function (app) {
  app.post("/api/comments", articles.createComment);
  //app.post("/api/articles", articles.create);
  app.delete("/api/comments/:id", articles.deleteComment);
  app.get("/api/comments/:id", articles.findCommentById);
  app.get("/api/comments", articles.getAllComments);
  //app.get("/api/comments", comments.getAllComments);
};
