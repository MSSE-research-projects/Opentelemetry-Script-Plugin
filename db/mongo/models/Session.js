const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    app: {
        type: Schema.Types.ObjectId, ref: 'App', required: true
    },
    ip: {
        type: String
    },
    processingStatus: {
        type: String, required: true, default: 'NOT_PROCESSED', enum: ['NOT_PROCESSED', 'PROCESSING', 'PROCESSED']
    }
}, { timestamps: true });

const Session = model('Session', sessionSchema);

module.exports = Session;
