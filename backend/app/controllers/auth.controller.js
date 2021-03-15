const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
  // Save User to Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message:
                "Félicitations " +
                req.body.firstName +
                "," +
                " Votre compte a bien été crée!",
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            message:
              "Félicitations " +
              req.body.firstName +
              "," +
              " Votre compte a bien été crée!",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.login = (req, res, next) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur inconnu !!!" });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Votre mot de passe est incorrect !!!",
        });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          userName: user.userName,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.suppressAccount = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } });
  /*.then(() => {
      res.status(200).send("Compte supprimé.");
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la suppression de l'article",
      });
    });*/
};

/*exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // hashing 10times the password contained in the body
    .then((hash) => {
      User.create({
        // creating a user with the authentified hashed password
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
      });
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Votre compte a été crée !" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Votre compte a été crée !" });
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
console.log("error");

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }) // looking for a particular user
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur inconnu !" }); // if user is not found, return error
      }
      bcrypt
        .compare(req.body.email, user.password) // let's compare the user's email with the hash in the database
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          return res.status(200).json({
            userId: user_id,
            token: jwt.token({ userId: user_id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
          const authorities = [];
          user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              roles: authorities,
            });
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
*/
