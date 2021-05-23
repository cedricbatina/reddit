const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Article = db.article;
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
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).send("Compte supprimé.");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.findAllUsers = (req, res) => {
  User.findAll({
    attributes: ["id", "userName", "email"],
  })
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => console.log(error));
};
