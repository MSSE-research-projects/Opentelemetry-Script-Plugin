const { User } = require("../../db/sqlite/db").sequelize.models;
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send();
        return;
    }
    let user;
    try {
        const { username, email } = jwt.verify(token, "JWT_SECRET");
        user = await User.findOne({ where: { username, email, token} });
    } catch (e) {
        res.status(401).send(e);
        return;
    }
    if (!user) {
        res.status(401).send();
        return;
    }
    req.user = user;
    next();
}

module.exports = { auth };
