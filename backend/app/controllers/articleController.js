const Sequelize = require("sequelize");

const Article = require("../models/index").article;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

// retrieve articles begins here

exports.findAll = (req, res) => {
  let title = req.query.title;

  return Article.findAll({
    include: [
      { model: User, as: "user", attributes: ["userName"] },
      { model: Comment, as: "comments", attributes: ["id", "text"] },
    ],
    attributes: ["id", "title", "content", "createdAt"],
    order: [["id", "DESC"]],
  })
    .then((articles) => res.status(200).json({ articles }))

    .catch((error) => {
      res.status(400).json({ error });
    });
};
// article creation logic begins here
exports.createArticle = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Le titre ne peut être vide !!!",
    });
    return;
  }
  if (!req.body.content) {
    res.status(404).send({
      message: "Le contenu ne peut être vide !!!",
    });
    return;
  }
  const article = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    userName: req.body.userName,
  };
  Article.create(article)
    .then(() =>
      res.status(201).json({
        message: " Votre article a bien été ajouté !!!",
      })
    )
    .catch((error) => {
      res.status(500).json({ message: "il y a une erreur", error });
    });
};

// create article endpoint ends here
// update article  endpoint
exports.modifyArticle = (req, res) => {
  const id = req.params.id;
  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Votre article a bien été mis à jour !!!",
        });
      } else {
        res.send({
          message: `Impossible de modifier l'article ${id}. Il se peut que l'article n'existe plus !!!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
};

// updating endpoint ends here, below begins deletion logic

exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;
  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Votre article a bien été supprimé !!!",
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'article ${id}. Peut étre que l'article n'existe plus dans la base de données !!!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// endpoint to find an article
exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  Article.findOne({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["userName"],
      },
      {
        model: Comment,
        as: "comments",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["userName"],
          },
        ],
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
        message: err,
      });
    });
};
// findOnarticle logic ends here
