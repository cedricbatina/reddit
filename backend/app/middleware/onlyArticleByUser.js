const db = require("../models");
const User = db.user;
const Article = db.article;

userArticlesOnly = (req, res) => {
  let id = User.id;
  let userId = req.params.userId;
  let condition = userId === id;
  if (!condition) {
    return res.status(501).send({
      message:
        "Vous n'avez pas d'articles. Veuillez en ajouter un, en cliquant sur le lien 'Ajouter un article' !!! ",
    });
  } else {
    Article.findAll({ where: { id: userId } })
      .then((articles) => res.send(201).json({ articles }))
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  }
};

const onlyUserArticles = {
  userArticlesOnly,
};
module.exports = onlyUserArticles;
