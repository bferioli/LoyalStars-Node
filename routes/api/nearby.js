module.exports = (app) => {
    const nearby = require('express').Router();
    const NearbyLocationsController = require('../../controllers/api/locations/nearbyLocations')(app);

    nearby.get("/", NearbyLocationsController);

    return nearby;
};