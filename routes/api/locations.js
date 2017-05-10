module.exports = (app) => {
    const locations = require('express').Router();

    // Location query routes

    const LocationController = require('../../controllers/api/locations/location')(app);
    const DeleteLocationController = require('../../controllers/api/locations/deleteLocation')(app);
    const UpdateLocationController = require('../../controllers/api/locations/updateLocation')(app);
    const CheckinCodeAvailableController = require('../../controllers/api/locations/checkinCodeAvailable')(app);
    const LocationCheckinsController = require('../../controllers/api/checkins/checkinsByLocation')(app);
    const LocationEarnedRewardsController = require('../../controllers/api/earnedRewards/earnedRewardsByLocation')(app);

    locations.get("/:locationId", LocationController);
    locations.delete("/:locationId", DeleteLocationController);
    locations.put("/:locationId", UpdateLocationController);
    locations.get("/checkin-code/:checkinCode", CheckinCodeAvailableController);
    locations.get("/:locationId/checkins", LocationCheckinsController);
    locations.get("/:locationId/earned-rewards", LocationEarnedRewardsController);

    return locations;
};