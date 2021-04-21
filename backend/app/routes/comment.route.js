//const articles = require("../controllers/article.controller");
const articles = require("../controllers/articleController");
const comments = require("../controllers/commentController");
const allRights = require("../middleware/authJwt");

module.exports = function (app) {
  app.post("/api/comments", comments.createComment);
  app.delete("/api/comments/:id", comments.deleteComment);
  app.put("/api/comments/:id", comments.modifyComment);
  app.get("/api/comments/:id", comments.getOneComment);
  app.get("/api/comments", comments.getAllComments);
};
