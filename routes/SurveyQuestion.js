const express = require('express');
const SurveyQuestion = require('../db/mongo/models/SurveyQuestion');
const router = express.Router();


router.post('/', async (req, res, next) => {
  const { question } = req.body;

  try {

    await SurveyQuestion.create(question);

    res.sendStatus(201);

  } catch (error) {
    console.log(error)
    res.json({ error });
  }
});

module.exports = router;
