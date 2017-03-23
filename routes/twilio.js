module.exports = (app) => {
    const twilio = require('express').Router();
    const TwilioController = require('../controllers/twilio')(app);

    twilio.post('/checkin', TwilioController);

    return twilio;
};