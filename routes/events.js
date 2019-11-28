const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const userService = require('../services/user.service');

// Getting all event
router.get('/', async (req, res) => {
    try {
        const event = await Event.find()
        res.json(event)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Creating one event
router.post('/', basicAuth, async (req, res) => {
    const event = new Event({
        body: req.body
    })

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


async function basicAuth(req, res, next) {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.user = user

    next();
}

module.exports = router