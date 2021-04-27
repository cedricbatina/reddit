const Sequelize = require("sequelize");
const Article = require("../models/index").article;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

exports.findAll = (req, res) => {
  let title = req.body.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  console.log(Article);
  return Article.findAll({ where: condition })

    .then((articles) => res.status(200).json({ articles }))

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
exports.findAllArticlesByUser = (req, res) => {
  let userId = req.body.userId;
  let id = User.id;
  console.log(id, userId);
  return Article.findAll({ where: userId === id }).then((articles) =>
    res
      .status(200)
      .json({ articles })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      })
  );
};

exports.createOneArticle = (req, res) => {
  if (!req.body.title) {
    res.status(402).send({ message: "Le titre ne peut être vide" });
    return;
  }
  if (!req.body.content) {
    res.status(403).send({ message: "Le contenu ne peut être vide" });
    return;
  }
  let article = req.body;

  return Article.create(article)

    .then((article) => {
      res.status(201).json({ message: "Votre article a été crée: " });
    })

    .catch((err) => {
      console.log(">> Error while creating article: ", err);
    });
};
exports.createArticle = (req, res) => {
  console.log(req.body);
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
    .then(
      (article) => console.log(article),

      res.status(201).json({
        message: " Votre article a bien été ajouté !!!",
      })
    )
    .catch((error) => {
      console.log(error);
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
      res.status(500).send({
        message:
          "Une erreur serveur est survenue lors de la modification de l'article" +
          id,
      });
    });
};

// updating endpoint ends here

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
        message:
          "Une erreur est survenue lors de la suppression de l'article" + id,
      });
    });
};
// endpoint to delete all articles

// endpoint to find an article
exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  Article.findOne({
    where: { id: id },
    include: ["comments"],
  })
    .then((data) => {
      res.send(data);
      console.log("article", data);
    })
    .catch((err) => {
      console.log(err);
      res.end();
      res.status(500).send({
        message: "Une erreur est parvenue en voulant accéder à l'article " + id,
      });
    });
};
/*
exports.deleteAll = (req, res, next) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Vos articles ont été bien supprimés !!!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue lors de la suppression des articles. Veuillez reéssayer ultérieurement !!!",
      });
    });
};*/
