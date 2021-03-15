const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  secret: "cedricbatina-secret-key",
};

/*module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const ROLES = db.ROLES;
    const User = db.user;
    if (req.body.userId && decodedToken.userId !== userId) {
      throw "UserId non valide !";
    } else {
      next();
    }
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Le rôle " + req.body.roles[i] + " n'existe pas !",
          });
          return;
        }
      }
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
*/
