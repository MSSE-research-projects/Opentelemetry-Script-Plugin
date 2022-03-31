const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");

class SessionRecord extends Model {}

SessionRecord.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    appId: {
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
    modelName: 'SessionRecord'
});

module.exports = SessionRecord;
