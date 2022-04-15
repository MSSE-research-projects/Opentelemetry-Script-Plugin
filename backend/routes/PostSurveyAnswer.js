const express = require('express');
const PostSurveyAnswer = require('../db/mongo/models/PostSurveyAnswer');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await PostSurveyAnswer
    .find()
    .populate("answers.question")
    .populate({
      path: 'session',
      model: 'Session',
      populate: {
        path: 'app',
        model: 'App'
      }
    })

    res.json(data);
  } catch (error) {
    res.json({ error });
  }
});

router.post('/', async (req, res, next) => {
  const { sessionId, answers } = req.body;

  try {

    await PostSurveyAnswer.create({session: sessionId, answers});

    res.sendStatus(201);

  } catch (error) {
    console.log(error)
    res.json({ error });
  }
});

module.exports = router;
