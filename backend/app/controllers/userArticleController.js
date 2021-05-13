const Article = require("../models/index").article;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

exports.findAllArticlesByUser = (req, res, next) => {
  let userId = req.params.userId;
  //let user = User.id;
  //console.log(id, userId);
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
    attributes: ["id", "title"],
    order: [["createdAt", "DESC"]],
    //where: condition,
  })
    .then((articles) => {
      console.log(articles), res.status(200).json({ articles });
    })
    .catch(
      (error) => console.log(error)

      // res.status(500).json({ message: "Il y a une erreur" })
    );
};
