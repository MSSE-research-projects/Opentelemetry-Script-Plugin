const express = require('express');
const SessionMongo = require('../db/mongo/models/Session')
const { SessionRecord } = require("../db/sqlite/db").sequelize.models;
const Aggregator = require("../utils/Aggregator");
const { Parser } = require('json2csv');
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post('/:appId', (req, res, next) => {
    const { appId } = req.params;
    SessionMongo.find({ processingStatus: 'NOT_PROCESSED', app: appId })
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

router.get('/:appId', async (req, res) => {
    const { appId } = req.params;
    const records = SessionRecord.findAll({ where: { AppId: appId }, raw: true });
    const parser = new Parser({ header: true });
    const csv = parser.parse(records);
    const csvPath = path.join(__dirname, "..", "temp-output");
    fs.writeFileSync(csvPath, csv);
    res.download(csvPath);
});

module.exports = router;
