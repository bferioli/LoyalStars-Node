module.exports = (app) => {
    const checkins = require('express').Router();

    // Checkin flow routes

    const CheckinController = require('../../controllers/api/checkins/checkin')(app);
    const ConfirmController = require('../../controllers/api/checkins/confirm')(app);

    checkins.get("/:checkinCode/:phone", CheckinController);
    checkins.post("/:checkinCode/:phone/confirm", ConfirmController);

    return checkins;
};