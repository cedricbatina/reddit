module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "groupomania",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000, // maximum time, in milliseconds, that a connection is set
  },
};
