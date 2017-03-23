module.exports = (app) => {
    const locations = require('express').Router();

    // Location query routes

    const LocationController = require('../../controllers/api/locations/location')(app);
    const DeleteLocationController = require('../../controllers/api/locations/deleteLocation')(app);
    const UpdateLocationController = require('../../controllers/api/locations/updateLocation')(app);
    const CheckinsByLocationController = require('../../controllers/api/checkins/checkinsByLocation')(app);
    const EarnedRewardsByLocationController = require('../../controllers/api/earnedRewards/earnedRewardsByLocation')(app);

    locations.get("/:locationId", LocationController);
    locations.delete("/:locationId", DeleteLocationController);
    locations.put("/:locationId", UpdateLocationController);
    locations.get("/:locationId/checkins", CheckinsByLocationController);
    locations.get("/:locationId/earned-rewards", EarnedRewardsByLocationController);

    return locations;
};