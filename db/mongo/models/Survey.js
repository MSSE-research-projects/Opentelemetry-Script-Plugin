const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const introductionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const questionSchema = new Schema({
  description: String,
  type: String,
  isRequired: Boolean,
  options: [String],
});

const infoQuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  questions: [questionSchema],
});

const taskSchema = new Schema({
  taskTitle: String,
  scenario: String,
  taskDesc: String,
});


const surveySchema = new Schema({
    intro: introductionSchema,
    preSurvey: infoQuestionSchema,
    tasks: [taskSchema],
    postSurvey: infoQuestionSchema,
    id: {
      type: String,
      unique: true,
      required: true,
    },
}, { timestamps: true });

const Survey = model('Survey', surveySchema);

module.exports = Survey;
