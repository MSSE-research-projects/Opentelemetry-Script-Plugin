const express = require('express');
const Feedback = require('../db/mongo/models/Feedback');
const router = express.Router();


router.post('/', async (req, res, next) => {
  const { email, content } = req.body;

  try {

    await Feedback.create({ email, content });

    res.sendStatus(201);

  } catch (error) {
    console.log(error)
    res.json({ error });
  }
});

module.exports = router;
