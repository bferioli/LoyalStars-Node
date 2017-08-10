module.exports = (app, passport) => {
    const locations = require('express').Router();

    // Location query routes

    const LocationController = require('../../controllers/api/locations/location')(app);
    const DeleteLocationController = require('../../controllers/api/locations/deleteLocation')(app);
    const UpdateLocationController = require('../../controllers/api/locations/updateLocation')(app);
    const CheckinCodeAvailableController = require('../../controllers/api/locations/checkinCodeAvailable')(app);
    const LocationCheckinsController = require('../../controllers/api/checkins/checkinsByLocation')(app);
    const LocationEarnedRewardsController = require('../../controllers/api/earnedRewards/earnedRewardsByLocation')(app);

    locations.get("/:locationId", LocationController);
    locations.delete("/:locationId", passport.authenticate('jwt-verify'), DeleteLocationController);
    locations.put("/:locationId", passport.authenticate('jwt-verify'), UpdateLocationController);
    locations.get("/checkin-code/:checkinCode", CheckinCodeAvailableController);
    locations.get("/:locationId/checkins", passport.authenticate('jwt-verify'), LocationCheckinsController);
    locations.get("/:locationId/earned-rewards", passport.authenticate('jwt-verify'), LocationEarnedRewardsController);

    return locations;
};