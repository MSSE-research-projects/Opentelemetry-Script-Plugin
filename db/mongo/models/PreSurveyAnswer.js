const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const preSurveyAnswerSchema = new Schema({
  session: {
    type: Schema.Types.ObjectId, ref: 'Session', required: true
  },
  answers: [
    {
      question: {
        type: Schema.Types.ObjectId, ref: "SurveyQuestion", required: true,
      },
      selectedOption: {
        type: String,
        required: true,    
      }
    },
  ],
}, { timestamps: true });

const Survey = model('PreSurveyAnswer', preSurveyAnswerSchema);

module.exports = Survey;
