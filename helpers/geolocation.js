var helpers = {};
var geolib = require('geolib');

helpers.getLocationWithinRadius = function(locLat, locLon, lat, lon, accuracy) {
    var distance = geolib.getDistance(
            { latitude: locLat, longitude: locLon },
            { latitude: lat, longitude: lon }
        ),
        threshold = 100 + accuracy;
    return distance <= threshold;
};

return helpers;