const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  description: String,
  type: String,
  isRequired: Boolean,
  options: [String],
}, { timestamps: true });

const SurveyQuestion = model('SurveyQuestion', questionSchema);

module.exports = SurveyQuestion;
