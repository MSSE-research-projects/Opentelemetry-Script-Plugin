const mongoose = require('mongoose');

const dbHost = "localhost";
const dbPort = 27017;
const dbName = "ux"

const dbInit = async () => await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

module.exports = dbInit;
