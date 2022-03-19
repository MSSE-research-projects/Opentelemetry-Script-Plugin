const express = require('express');
const App = require('../db/models/App')
const router = express.Router();

router.get('/', (req, res, next) => {
    App.find()
        .lean()
        .exec()
        .then(apps => {
            res.send(apps);
        })
});

module.exports = router;
