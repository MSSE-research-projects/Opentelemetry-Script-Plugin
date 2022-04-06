const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");
const SessionRecord = require("./SessionRecord");

class App extends Model {}

App.init({
    id: {
        type: DataTypes.UUID,
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
    }
}, {
    sequelize,
    modelName: 'App'
});

// TODO: add relationship back when we have enough data
// App.hasMany(SessionRecord, {
//     foreignKey: {
//         allowNull: false,
//         name: "appId"
//     }
// });
//
// SessionRecord.belongsTo(App);

App.sync({ alter: true });

module.exports = App;
