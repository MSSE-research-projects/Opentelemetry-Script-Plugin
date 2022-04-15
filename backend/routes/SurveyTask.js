const express = require('express');
const SurveyTask = require('../db/mongo/models/SurveyTask');
const router = express.Router();


router.post('/', async (req, res, next) => {
  const { task } = req.body;

  try {

    await SurveyTask.create(task);

    res.sendStatus(201);

  } catch (error) {
    console.log(error)
    res.json({ error });
  }
});

module.exports = router;
