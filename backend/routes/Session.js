const express = require('express');
const App = require('../db/mongo/models/App');
const Session = require('../db/mongo/models/Session');
const router = express.Router();

router.post('/', (req, res, next) => {
    const { appId } = req.body;
    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    App.findById(appId).exec()
        .then(app => {
            Session.create({
                app,
                ip
            }).then(session => {
                res.send({ id: session._id });
            })
        })
});

module.exports = router;
