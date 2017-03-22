const helpers = {};
const geolib = require('geolib');

helpers.getLocationWithinRadius = (locLat, locLon, lat, lon, accuracy) => {
    const distance = geolib.getDistance(
            { latitude: locLat, longitude: locLon },
            { latitude: lat, longitude: lon }
        ),
        threshold = 100 + accuracy;
    return distance <= threshold;
};

return helpers;