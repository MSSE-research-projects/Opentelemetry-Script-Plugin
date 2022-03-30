const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");
const App = require("./App");

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING, allowNull: false
    },
    password: {
        type: DataTypes.STRING, allowNull: false
    },
    first_name: {
        type: DataTypes.STRING, allowNull: false
    },
    last_name: {
        type: DataTypes.STRING, allowNull: false
    },
    email: {
        type: DataTypes.STRING, allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});

User.hasMany(App, {
    foreignKey: {
        name: "owner",
        allowNull: false
    }
})

module.exports = User;
