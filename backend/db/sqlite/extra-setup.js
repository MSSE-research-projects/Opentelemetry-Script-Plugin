function applyExtraSetup(sequelize) {
    const { User, SessionRecord, App } = sequelize.models;

    User.hasMany(App);
    App.belongsTo(User);

    App.hasMany(SessionRecord);
    SessionRecord.belongsTo(App);
}

module.exports = { applyExtraSetup };
