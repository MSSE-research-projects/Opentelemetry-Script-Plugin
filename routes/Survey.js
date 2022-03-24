const express = require('express');
const Survey = require('../db/models/Survey');
const router = express.Router();


router.get('/:surveyId', async (req, res, next) => {
  try {
    const { surveyId } = req.params;

    const excludedFields = [
      '__v', '_id', 'id', 'intro._id', 'preSurvey._id', 'preSurvey.questions._id',
      'tasks._id', 'postSurvey._id', 'postSurvey.questions._id'
    ];

    const excludedSelections = excludedFields.map(field => '-' + field).join(' ')

    const data = await Survey.findOne({ id: surveyId }).select(excludedSelections).exec();

    const allIds = await Survey.find().select('id -_id').exec();

    if (data === null) {
      return res.json({
        availableIds: allIds.map(({ id }) => id),
        message: "requested id does not exist"
      });
    };
    
    res.json(data);
  } catch (error) {
    res.json({ error });
  }
  
});


router.post('/', async (req, res, next) => {
  const { survey, surveyId } = req.body;
  const doc = { id: surveyId, ...survey };

  try {

    await Survey.create(doc);

    res.sendStatus(201);

  } catch (error) {
    const { code: mongoDBErrorCode } = error;

    if (mongoDBErrorCode == 11000) {
      return res.json({ mongoDBErrorCode, message: "duplicate id" }); 
    }
    res.json({ mongoDBErrorCode, error });
  }
});

module.exports = router;
