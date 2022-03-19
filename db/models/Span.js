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
        type: String, required: true
    },
    events: {
        type: Array, required: true, default: []
    },
    name: {
        type: String, required: true
    },
    parentId: {
        type: String, required: true
    },
    status: {
        type: String, required: true
    },
    timestamp: {
        type: Number, required: true
    },
    traceId: {
        type: String, required: true
    }
}, { timestamps: true, _id: false });

const Span = model('Span', spanSchema);

module.exports = Span;
