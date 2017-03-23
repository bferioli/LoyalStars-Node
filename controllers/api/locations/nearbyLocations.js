const ErrorHelpers = require('../../../helpers/error.js');
const GeoHelpers = require('../../../helpers/geolocation.js');

module.exports = (app) => {
    const NearbyLocationsController = (req, res) => {

        app.LocationModel.getAll()
            .then( (locations) => {
                const nearby = locations.filter( (location) => {
                    if (!location.latitude || !location.longitude)
                        return false;

                    const coords = {
                        locLat: location.latitude,
                        locLon: location.longitude,
                        lat: req.query.latitude,
                        lon: req.query.longitude,
                        accuracy: req.query.accuracy
                    };

                    return GeoHelpers.getLocationWithinRadius(coords);
                });

                res.json(nearby);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return NearbyLocationsController;
};
