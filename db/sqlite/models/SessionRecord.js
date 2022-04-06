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
    sessionId: {
        type: DataTypes.STRING, allowNull: false
    },
    taskNumber: {
        type: DataTypes.STRING, allowNull: false
    },
    taskStart: {
        type: DataTypes.INTEGER, allowNull: false
    },
    taskEnd: {
        type: DataTypes.INTEGER, allowNull: false
    },
    steps: {
        type: DataTypes.INTEGER, allowNull: false
    },
    clicks: {
        type: DataTypes.INTEGER, allowNull: false
    },
    back: {
        type: DataTypes.INTEGER, allowNull: false
    },
    navigations: {
        type: DataTypes.INTEGER, allowNull: false
    },
    pauses: {
        type: DataTypes.INTEGER, allowNull: false
    },
    crashes: {
        type: DataTypes.INTEGER, allowNull: false
    },
    extraInformation: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'SessionRecord'
});

module.exports = SessionRecord;
