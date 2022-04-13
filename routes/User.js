const express = require('express');
const { User } = require("../db/sqlite/db").sequelize.models;
const router = express.Router();

router.post('/register', (req, res, next) => {

});

router.post('/login', (req, res, next) => {

});

module.exports = router;
