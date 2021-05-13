//const http = require("http"); // importing Node's HTTP pack

const express = require("express");
const bodyParser = require("body-parser");
//const userRoutes = require("../backend/app/routes/user.route");
//const articleRoutes = require("../backend/app/routes/article.route");
//const authRoutes = require("./app/routes/auth.route");
//const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/*
const corsOptions = {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  //origin: "http://localhost:3001",
};
*/
//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json()); //192.168.1.187:3004/

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const db = require("./app/models");
const Role = db.role;

/*db.sequelize.sync().then(() => {
  //roleFunction();
});*/
db.sequelize.sync().then(() => {});

/*db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  //initial();
});*/

/*db.sequelize.sync({ force: false }).then(() => {
  initial();
});

console.log("Drop and re-sync db.");

initial();*/
// global function goes here
function roleFunction() {
  // create a simple user's role
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    // create a total access admin role
    id: 2,
    name: "admin",
  });
}

// set  routes
require("./app/routes/user.route")(app);
require("./app/routes/auth.route")(app);
require("./app/routes/article.route")(app);
require("./app/routes/comment.route")(app);
require("./app/routes/userArticle.route")(app);
//app.use("/api/articles", articleRoutes);
//require("./app/routes/comment.route")(app);
//app.use("/api/users", userRoutes);
//app.use("/api/auth", authRoutes);
//app.use("/api/user", router);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
