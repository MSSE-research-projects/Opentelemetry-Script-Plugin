const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const feedback = new Schema({
  email: {
    type: String,
  },
  content: {
    type: String
  },
}, { timestamps: true });

const FeedBack = model('FeedBack', feedback);

module.exports = FeedBack;
