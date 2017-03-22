const helpers = {};
const geolib = require('geolib');

helpers.getLocationWithinRadius = ({ locLat, locLon, lat, lon, accuracy }) => {
    const distance = geolib.getDistance(
            { latitude: locLat, longitude: locLon },
            { latitude: lat, longitude: lon }
        ),
        threshold = 100 + accuracy;
    return distance <= threshold;
};

helpers.geoFence = function ({ request, location, user }) {
    return new Promise( (resolve, reject) => {
        // Pass for super users
        if (user && user.superUser)
            return resolve();

        // Pass if location geo coordinates not set
        if (!location.latitude || !location.longitude)
            return resolve();

        // Fail if user geo coordinates not set
        if (!request.latitude || !request.longitude || !request.accuracy)
            return reject(new Error('Geolocation must be enabled to verify your checkin.'));

        const coords = {
            locLat: location.latitude,
            locLon: location.longitude,
            lat: request.latitude,
            lon: request.longitude,
            accuracy: request.accuracy
        };
        const withinRadius = helpers.getLocationWithinRadius(coords);

        if (withinRadius)
            resolve();
        else
            reject(new Error('You must be present at this location to check in.'));
    });
};

module.exports = helpers;