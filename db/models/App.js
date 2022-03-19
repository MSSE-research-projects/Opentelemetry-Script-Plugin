const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const appSchema = new Schema({
    name: {
        type: String, required: true
    },
    version: {
        type: Number, required: true
    },
    host: {
        type: String, required: true
    },
    owner: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    }
}, { timestamps: true });

const App = model('App', appSchema);

module.exports = App;
