const express = require('express');
const Span = require('../db/mongo/models/Span');
const Session = require('../db/mongo/models/Session');
const router = express.Router();

router.post('/', (req, res, next) => {
    const { session, spans } = req.body;
    const docs = spans.map(span => ({ ...span, session, id: span._spanContext.spanId, traceId: span._spanContext.traceId }));
    Span.insertMany(docs).then(() => {
        res.send("ok");
    })
});

module.exports = router;
