const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Username
noDuplication = (req, res, next) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Echec! ce pseudo est déjà utilisé.",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Echec! cet email est déjà utilisé.",
        });
        return;
      }

      next();
    });
  });
};

daRole = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Echec! ce rôle n'existe pas. = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  noDuplication: noDuplication,
  daRole: daRole,
};

module.exports = verifySignUp;
