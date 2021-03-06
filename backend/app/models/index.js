const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.article = require("./article.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);

db.user.hasMany(db.article, { as: "articles" }); // one-to-many en standard ORM
db.article.belongsTo(db.user, {
  foreignKey: "userId",
});
// one-to-many relationship. an article has many comments, and a comment belongs to only one article !!
db.article.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.article, { foreignKey: "articleId", as: "article" });
// I've added this one-to-many relationship between user and comments, in order to figure out issues 05-03-2021
db.user.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
// a new pivot table user_roles as connection between users and roles table via their primary key as foreign keys.
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

module.exports = db;
