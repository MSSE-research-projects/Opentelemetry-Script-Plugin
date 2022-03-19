const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const spanSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId, ref: 'Session', required: true
    },
    id: {
        type: String, required: true
    },
    attributes: {
        type: Array, required: true
    },
    events: {
        type: Array, required: true, default: []
    },
    name: {
        type: String, required: true
    },
    parentId: {
        type: String
    },
    status: {
        type: Schema.Types.Mixed, required: true
    },
    startTime: {
        type: Array, required: true
    },
    endTime: {
        type: Array, required: true
    },
    traceId: {
        type: String, required: true
    }
}, { timestamps: true, _id: false });

const Span = model('Span', spanSchema);

module.exports = Span;
