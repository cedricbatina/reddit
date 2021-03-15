//const authCtrl = require("../controllers/auth.controller");

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.noDuplication, verifySignUp.daRole],
    controller.signup
  );
  app.post("/api/auth/login", controller.login);
  app.delete("/api/auth/user/:id", controller.suppressAccount);
};

/*module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", authCtrl.signup);

  app.post("/api/auth/login", authCtrl.login);
};
*/
