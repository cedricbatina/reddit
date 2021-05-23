const controller = require("../controllers/commentController");

module.exports = function (app) {
  app.post("/api/comments", controller.createComment);
  app.delete("/api/comments/:id", controller.deleteComment);
  app.get("/api/comments/:id", controller.getOneComment);
};
