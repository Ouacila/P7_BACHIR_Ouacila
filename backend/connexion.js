const Sequelize = require("sequelize");

const sequelize = new Sequelize("socialNetwork_DB", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;