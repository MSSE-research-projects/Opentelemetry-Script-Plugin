const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");

class App extends Model {}

App.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    version: {
        type: DataTypes.DOUBLE
    },
    host: {
        type: DataTypes.STRING, allowNull: false
    },
    owner: {
        type: DataTypes.STRING, allowNull: false
    },
    email: {
        type: DataTypes.STRING, allowNull: false
    }
}, {
    sequelize,
    modelName: 'App'
});

module.exports = App;
