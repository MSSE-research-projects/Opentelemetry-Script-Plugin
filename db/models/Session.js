const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    app: {
        type: Schema.Types.ObjectId, ref: 'App', required: true
    },
    ip: {
        type: String
    }
}, { timestamps: true });

const Session = model('Session', sessionSchema);

module.exports = Session;
