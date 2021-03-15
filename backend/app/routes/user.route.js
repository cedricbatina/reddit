//const { authJwt } = require("../middleware/authJwt");
//const auth = require("../middleware/auth");

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/", controller.allAccess);
  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

/*module.exports = (app) => {
  app.get("/api/", userCtrl.allAccess);

  app.get("/api/auth/user", userCtrl.userBoard);

  app.get("/api/auth/admin", userCtrl.adminBoard);

  //app.use("/api/user", router);
};
*/
/*module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/", userCtrl.allAccess);

  app.get("/api/user", [auth], userCtrl.userBoard);

  app.get("/api/admin", [auth, isAdmin], userCtrl.adminBoard);
  
};*/

/*module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/", userCtrl.allAccess);

  app.get("/api/auth/user", userCtrl.userBoard);

  app.get("/api/auth/admin", userCtrl.adminBoard);
};*/
////////////////// or this one

/*module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",

    controller.signup
  );

  app.post("/api/auth/signin", controller.login);
};
*/
