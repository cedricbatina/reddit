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
      console.log("comment", data);
    })
    .catch((err) => {
      console.log(err);
      res.end();
      res.status(500).send({
        message:
          "Une erreur est parvenue en voulant accéder au commentaire " + id,
      });
    });
};

exports.createComment = (req, res) => {
  console.log(req.body);
  //const userId = localStorage.getItem("user").id;
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
      console.log(error);
      res.status(400).json({ message: "il y a une erreur", error });
    });
};
exports.deleteComment = (req, res, next) => {
  let id = req.params.id;
  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Votre commentaire a bien été supprimé !!!",
        });
      } else {
        res.send({
          message: `Impossible de supprimer le commentaire ${id}. Peut étre que le commentaire n'existe plus dans la base de données !!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est survenue lors de la suppression du commentaire" + id,
      });
    });
};
exports.getAllComments = (req, res) => {
  let text = req.query.text;
  console.log(text);
  Comment.findAll({
    include: [
      { model: User, as: "user", attributes: ["userName"] },
      /*{
        model: Article,
        as: "articles",
        attributes: ["id"],
      },*/
    ],
    attributes: ["id", "text"],
  })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
//// GOING TO BED I WILL CONTINUE TOMORROW. AM WORKING IN PROGRESS

exports.deleteComm = (req, res, next) => {
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
