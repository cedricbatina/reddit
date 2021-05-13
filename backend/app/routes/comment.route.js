const controller = require("../controllers/commentController");

module.exports = function (app) {
  app.post("/api/comments", controller.createComment);
  app.delete("/api/comments/:id", controller.deleteComment);
  app.get("/api/comments/:id", controller.getOneComment);
  //am not using this route below, but we never know
  app.get("/api/comments", controller.getAllComments);
};
