const Article = require("../models/index").article;
const Comment = require("../models/index").comments;

exports.findAll = (req, res) => {
  let title = req.body.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  console.log(Article);
  return Article.findAll({ where: condition }, { include: ["comments"] })
    .then((articles) => res.status(200).json({ articles }))

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
/*
exports.findAll = () => {
  return Article.findAll(
    { where: condition },
    {
      include: ["comments"],
    }
  ).then((articles) => {
    return articles;
  });
};*/

exports.findAll = (req, res) => {
  let title = req.body.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  console.log(Article);
  Article.findAll({ where: condition }, { include: ["comments"] })
    .then((articles) => res.status(200).json({ articles }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
/*
// create an article endpoints
exports.createArticle = (req, res) => {
  return Article.create({
    title: article.title,
    content: article.content,
    userId: article.userId,
    published: req.body.published ? req.body.published : false,
  })
    .then((article) => {
      console.log(">> Article crée: " + JSON.stringify(article, null, 4));
      res.status(201).json({ article });
      return article;
    })
    .catch((err) => {
      console.log(
        ">> Une erreur est survenue en voulant créer l'article: ",
        err
      );
    });
};*/

exports.createArticle = (req, res) => {
  console.log(req.body);
  if (!req.body.title) {
    res.status(400).send({
      message: "Le titre ne peut être vide !!!",
    });
  } else if (!req.body.content) {
    res.status(404).send({
      message: "Le contenu ne peut être vide !!!",
    });
    return;
  }
  //const articleObject = JSON.parse(req.body.article);
  //delete articleObject._id;
  const article = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    published: req.body.published ? req.body.published : false,
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
  /* if (userRole != 2) {
    res.status(404);
  }*/

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

// I wanna set the router for likes and dislikes
// adding like

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
};
// endpoint to find article
exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  const comment = req.params.comments;
  console.log(id);
  Article.findOne({ where: { id: id }, include: ["comments"] })
    //Article.findByPk(/*{ where: { id: id }, include: ["comments"] }*/)
    .then((data) => {
      res.send(data);
      console.log(comment);
    })
    .catch((err) => {
      console.log(err);
      res.end();
      res.status(500).send({
        message: "Une erreur est parvenue en voulant accéder à l'article " + id,
      });
    });
};

// below go endpoints for comments
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["article"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(
        "Une erreur est survenue en voulant accéder au commentaire: " + id,
        err
      );
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
      res.status(500).json({ message: "il y a une erreur", error });
    });
  /*return Comment.create(comment)
    .then((comment) => {
      console.log("Commentaire crée: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(
        "Une erreur est surveune en voulant créer le commentaire: ",
        err
      );
    });*/
};
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
