const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class SessionRecord extends Model {}

    SessionRecord.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sessionId: {
            type: DataTypes.STRING, allowNull: false
        },
        taskId: {
            type: DataTypes.STRING, allowNull: false
        },
        taskStart: {
            type: DataTypes.INTEGER, allowNull: false
        },
        taskEnd: {
            type: DataTypes.INTEGER,
        },
        alerts: {
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
};
