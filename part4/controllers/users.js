const bcrypt = require('bcrypt');
const usersRoute = require('express').Router();
const User = require('../models/user');

usersRoute.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

usersRoute.get('/', async (req, res) => {
    const users = await User.find({});

    res.json(users);
});

module.exports = usersRoute;
