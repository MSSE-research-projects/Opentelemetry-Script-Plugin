const express = require('express');
const AppMongo = require('../db/mongo/models/App');
const { App } = require("../db/sqlite/db").sequelize.models;
const router = express.Router();
const { auth } = require('./middlewares/auth');

router.post('/', auth, async (req, res, next) => {
    const user = req.user;
    const { name, host, version } = req.body;
    if (!name || !host || !version) {
        res.status(400).send("Missing required fields.");
        return;
    }
    const appMongo = await AppMongo.findOrCreate({ name, version, host });
    const app = await App.findOrCreate({
        where: { id: appMongo._id.toString() },
        defaults: { UserId: user.id, name, host, version }
    });
    res.status(201).json(app);
});

router.get('/', auth, async (req, res) => {
    const user = req.user;
    const apps = App.findAll({ where: { userId: user.id } });
    res.status(200).json(apps);
})

module.exports = router;
