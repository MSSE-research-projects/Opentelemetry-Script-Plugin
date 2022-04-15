const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  taskTitle: String,
  scenario: String,
  taskDesc: String,
}, { timestamps: true });

const SurveyTask = model('SurveyTask', taskSchema);

module.exports = SurveyTask;
