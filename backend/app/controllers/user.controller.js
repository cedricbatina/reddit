//const User = require("../models/user.model");

exports.allAccess = (req, res, next) => {
  res.status(200).send("Contenu publique.");
};

exports.userBoard = (req, res, next) => {
  res.status(200).send("Contenu utilisateur.");
};

exports.adminBoard = (req, res, next) => {
  res.status(200).send("Contenu Administrateur.");
};
