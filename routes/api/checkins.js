module.exports = (app) => {
    const checkins = require('express').Router();

    // Checkin flow routes

    const CheckinController = require('../../controllers/api/checkins/checkin')(app);
    const ConfirmController = require('../../controllers/api/checkins/confirm')(app);

    checkins.get("/:checkinCode/:phone", CheckinController);
    checkins.post("/:checkinCode/:phone/confirm", ConfirmController);

    // Checkin query routes

    const CheckinsController = require('../../controllers/api/checkins/checkins')(app);

    checkins.get("/", CheckinsController);

    return checkins;
};