const Article = require("../models/index").article;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

exports.findAllArticlesByUser = (req, res, next) => {
  let userId = req.params.userId;
  return Article.findAll({
    where: { userId: userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["userName"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id"],
      },
    ],
    attributes: ["id", "title", "createdAt"],
    order: [["id", "DESC"]],
  })
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((error) => res.status(400).json({ error }));
};
