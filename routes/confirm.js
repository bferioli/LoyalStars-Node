module.exports = function (app) {
    var ConfirmRoute = function (req, res) {

        // decode phone

        var data = {};

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then(function (location) {
                data.location = location;
                return app.CheckinModel.getByCompany(location.company, req.params.phone);
            })
            .then(function (checkins) {
                data.checkins = checkins;
                return app.UserModel.getByPhone(req.params.phone)
            })
            .then(function (user) {
                if (!user || !user.superUser) {
                    var checkinsToday = data.checkins, // Todo: get only checkins from today
                        checkinsLastTwoHours = data.checkins, // Todo: get only checkins from last two hours
                        locationOpenNow = app.TimeHelpers.getLocationOpenNow(data.location);

                    // Time fencing
                    if (!locationOpenNow) {
                        res.status(404).send('This location is not currently open.');
                        return;
                    } else if (checkinsToday.length >= 2) {
                        res.status(404).send('You cannot check in here more than twice daily.');
                        return;
                    } else if (checkinsLastTwoHours.length >= 1) {
                        res.status(404).send('You cannot check in here more than once within two hours.');
                        return;
                    }

                    // Geo fencing
                    if (data.location.latitude && data.location.longitude) {
                        if (!req.params.latitude || !req.params.longitude || !req.params.accuracy) {
                            res.status(404).send('Geolocation must be enabled to verify your checkin.');
                            return;
                        } else {
                            withinRadius = app.GeolocationHelpers.getLocationWithinRadius(data.location.latitude, data.location.longitude, req.params.latitude, req.params.longitude, req.params.accuracy);
                            if (!withinRadius) {
                                res.status(404).send('You must be present at this location to check in.');
                                return;
                            }
                        }
                    }
                }

                var checkin = new app.CheckinModel({
                    company: data.location.company._id,
                    location: data.location._id,
                    phone: req.params.phone,
                    latitude: req.params.latitude,
                    longitude: req.params.longitude,
                    accuracy: req.params.accuracy,
                    reward: data.location.reward._id
                });

                if (user && user._id)
                    checkin.user = user._id;

                app.CheckinModel.savePromise(checkin)
                    .then(function () {
                        return app.CheckinModel.getByCompany(data.location.company, req.params.phone);
                    })
                    .then(function (checkins) {
                        data.checkins = checkins;
                        data.totalCheckins = checkins.length;
                        data.checkinsRequired = data.location.reward.checkinsRequired;
                        data.checkinsEarned = data.totalCheckins % data.checkinsRequired;
                        data.rewardEarned = ( data.checkinsEarned == 0 && data.totalCheckins > 0 );
                        data.theme = app.TemplateHelpers.getTheme('orange');

                        if (data.rewardEarned) {
                            var reward = new app.RewardModel({
                                company: data.location.company._id,
                                companyReward: data.location.reward._id,
                                location: data.location._id,
                                phone: req.params.phone
                            });

                            app.RewardModel.savePromise(reward)
                                .then(function () {
                                    data.reward = reward;
                                    res.json(data);
                                    return;
                                })
                        }

                        data.rowWidth = app.TemplateHelpers.getRowWidth(data.checkinsRequired);
                        data.rowRange = parseInt(1 + Math.floor(data.checkinsRequired / data.rowWidth));
                        data.theme = app.TemplateHelpers.getTheme('orange');
                        data.cardMessage = data.checkinsRequired - data.checkinsEarned + ' More check-in(s) to earn a ' + data.location.reward.name;

                        res.json(data);
                    })
                    .catch(console.log)
                    .done();
            })
            .catch(console.log)
            .done();
    };

    return ConfirmRoute;
};