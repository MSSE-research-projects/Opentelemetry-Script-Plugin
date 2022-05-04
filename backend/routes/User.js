const express = require('express');
const { createHash } = require('crypto');
const { User } = require("../db/sqlite/db").sequelize.models;
const jwt = require('jsonwebtoken');
const {auth} = require("./middlewares/auth");
const router = express.Router();

const hash = (pwd) => createHash('sha256').update(pwd).digest('hex');

router.post('/register', async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    if (!username || !password || !firstName || !lastName || !email) {
        res.status(400).send("Must provide both username and password.");
        return
    }
    const existingUser = await User.findOne({ where: { username }});
    if (existingUser) {
        res.status(401).send("Username is token.");
        return
    }
    const hashedPassword = hash(password);
    // update in production mode
    const token = jwt.sign({ username, email }, "JWT_SECRET");
    await User.create({
        username, email, password: hashedPassword, token, firstName, lastName
    });
    res.status(200).json({
        firstName, lastName, email, username, token
    });
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Must provide both username and password.");
    }
    const hashedPassword = hash(password);
    const existingUser = await User.findOne({ where: { username, password: hashedPassword } });
    if (!existingUser) {
        res.status(401).send("Invalid username or password.");
    } else {
        const { username, email, firstName, lastName, token } = existingUser;
        res.status(200).json({
            firstName, lastName, email, username, token
        });
    }
});

router.get('/login', auth, async(req, res) => {
    const user = req.user;
    const { username, email, firstName, lastName, token } = user;
    res.status(200).json({
        firstName, lastName, email, username, token
    });
})

module.exports = router;
