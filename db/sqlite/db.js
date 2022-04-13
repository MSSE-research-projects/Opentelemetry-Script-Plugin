const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const dbInit = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
}

const modelDefiners = [
    require('./models/App'),
    require('./models/SessionRecord'),
    require('./models/User'),
    // Add more models here...
    // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = { sequelize, dbInit };
