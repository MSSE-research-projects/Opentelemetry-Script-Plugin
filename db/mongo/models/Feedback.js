const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const feedback = new Schema({
  session: {
    type: Schema.Types.ObjectId, ref: 'Session', required: true
  },
  email: {
    type: String,
  },
  content: {
    type: String
  },
}, { timestamps: true });

const FeedBack = model('FeedBack', feedback);

module.exports = FeedBack;
