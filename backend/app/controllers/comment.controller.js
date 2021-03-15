const db = require("../models");
//const Article = db.article;
const Comment = db.comments;
/*
exports.createComment = (req, res) => {
  console.log(req.body);
  //const userId = localStorage.getItem("user").id;
  const comment = {
    text: req.body.text,
    articleId: req.body.articleId,
    userId: req.body.userId,
  };
  return Comment.create(comment)

    .then((comment) => {
      console.log("Commentaire crée: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(
        "Une erreur est surveune en voulant créer le commentaire: ",
        err
      );
    });
};
*/

exports.deleteComment = (req, res) => {
  const id = req.params.id;

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
          message: `Impossible de supprimer le commentaire ${id}. Peut étre que l'article n'existe plus dans la base de données !!`,
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
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["article"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

exports.getAllComments = (req, res) => {
  let comment = req.body.text;
  console.log(comment);
  Comment.findAll()
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["article"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

exports.createComment = (articleId, comment) => {
  return Comment.create({
    text: comment.text,
    articleId: comment.articleId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};
