const express = require('express');
const App = require('../db/models/App');
const Session = require('../db/models/Session');
const router = express.Router();

router.post('/', (req, res, next) => {
    const { host } = req.body;
    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    App.findOne({ host }).sort('-version').exec()
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
