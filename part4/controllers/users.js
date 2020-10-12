const bcrypt = require('bcrypt');
const usersRoute = require('express').Router();
const User = require('../models/user');

usersRoute.post('/', async (request, response) => {
    const body = request.body;

    if (!body.password) {
        return response.status(400).json({ error: 'password required' });
    } else if (body.password.length < 3) {
        return response.status(400).json({ error: 'password length should be more than 3 characters' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

usersRoute.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });

    response.json(users);
});

module.exports = usersRoute;
