const express = require('express');
const Session = require('../db/mongo/models/Session')
const Aggregator = require("../utils/Aggregator");
const router = express.Router();

router.post('/:appId', (req, res, next) => {
    const { appId } = req.params;
    Session.find({ processingStatus: 'NOT_PROCESSED', app: appId })
        .exec()
        .then(sessions => {
            if (sessions.length === 0) {
                res.send("All sessions processed. Ready to download.");
            } else {
                res.send("Starting to process sessions and aggregate data.");
                const agg = new Aggregator(appId, sessions)
                agg.run()
            }
        })
});

router.get('/:appId', (req, res) => {

});

module.exports = router;
