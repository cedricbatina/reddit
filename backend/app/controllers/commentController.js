const Article = require("../models/index").article;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

// below go endpoints for comments

exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  Comment.findOne({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["userName"],
      },
    ],
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.end();
      res.status(500).send({
        err,
      });
    });
};

exports.createComment = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({
      message: "Le texte ne peut être vide !!!",
    });
    return;
  }
  const comment = {
    text: req.body.text,
    articleId: req.body.articleId,
    userId: req.body.userId,
    userName: req.body.userName,
  };
  Comment.create(comment)
    .then(
      (comment) => console.log(comment),

      res.status(201).json({
        message: " Votre commentaire a bien été ajouté !!!",
      })
    )
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.getAllComments = (req, res) => {
  let text = req.query.text;
  Comment.findAll({
    attributes: ["id", "text", "userName", "articleId"],
  })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteComment = (req, res, next) => {
  const id = req.params.id;
  Comment.findOne({ where: { id: id } })
    .then(() => {
      Comment.destroy({ where: { id: req.params.id } })
        .then(() =>
          res
            .status(201)
            .json({ message: " Le commentaire a bien été supprimé !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
