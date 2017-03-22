const helpers = {};
const geolib = require('geolib');
const Q = require('q');

helpers.getLocationWithinRadius = ({ locLat, locLon, lat, lon, accuracy }) => {
    const distance = geolib.getDistance(
            { latitude: locLat, longitude: locLon },
            { latitude: lat, longitude: lon }
        ),
        threshold = 100 + accuracy;
    return distance <= threshold;
};

helpers.geoFence = function ({ request, location, user }) {
    const deferred = Q.defer();

    // Pass for super users
    if (user && user.superUser) {
        deferred.resolve();
        return deferred.promise;
    }

    // Pass if location geo coordinates not set
    if (!location.latitude || !location.longitude) {
        deferred.resolve();
        return deferred.promise;
    }

    // Fail if user geo coordinates not set
    if (!request.latitude || !request.longitude || !request.accuracy) {
        deferred.reject(new Error('Geolocation must be enabled to verify your checkin.'));
        return deferred.promise;
    }

    const coords = {
        locLat:  location.latitude,
        locLon: location.longitude,
        lat: request.latitude,
        lon: request.longitude,
        accuracy: request.accuracy
    };
    const withinRadius = helpers.getLocationWithinRadius(coords);

    if (withinRadius)
        deferred.resolve();
    else
        deferred.reject(new Error('You must be present at this location to check in.'));

    return deferred.promise;
};

module.exports = helpers;