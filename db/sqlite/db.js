const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const dbInit = async () => await sequelize.authenticate();

module.exports = { dbInit, sequelize };
