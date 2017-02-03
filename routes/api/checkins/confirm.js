var moment = require('moment');

module.exports = function (app) {
    var ConfirmRoute = function (req, res) {
        var data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then(function (location) {
                data.location = location;
                return app.CheckinModel.getByPhoneAtCompany(location.company, phone);
            })
            .then(function (checkins) {
                data.checkins = checkins;
                return app.UserModel.getByPhone(phone)
            })
            .then(function (user) {
                if (!user || !user.superUser) {
                    var checkinsToday = data.checkins.filter(app.TimeHelpers.checkinsTodayFilter),
                        checkinsLastTwoHours = data.checkins.filter(app.TimeHelpers.checkinsLastTwoHoursFilter),
                        locationOpenNow = app.TimeHelpers.getLocationOpenNow(data.location);

                    // Time fencing
                    if (!locationOpenNow) {
                        app.ErrorHelpers.notFound(res)('This location is not currently open.');
                        return;
                    } else if (checkinsToday.length >= 2) {
                        app.ErrorHelpers.notFound(res)('You cannot check in here more than twice daily.');
                        return;
                    } else if (checkinsLastTwoHours.length >= 1) {
                        app.ErrorHelpers.notFound(res)('You cannot check in here more than once within two hours.');
                        return;
                    }

                    // Geo fencing
                    if (data.location.latitude && data.location.longitude) {
                        if (!req.params.latitude || !req.params.longitude || !req.params.accuracy) {
                            app.ErrorHelpers.notFound(res)('Geolocation must be enabled to verify your checkin.');
                            return;
                        } else {
                            withinRadius = app.GeolocationHelpers.getLocationWithinRadius(data.location.latitude, data.location.longitude, req.params.latitude, req.params.longitude, req.params.accuracy);
                            if (!withinRadius) {
                                app.ErrorHelpers.notFound(res)('You must be present at this location to check in.');
                                return;
                            }
                        }
                    }
                }

                var checkin = new app.CheckinModel({
                    company: data.location.company._id,
                    location: data.location._id,
                    phone: phone,
                    latitude: req.params.latitude,
                    longitude: req.params.longitude,
                    accuracy: req.params.accuracy,
                    reward: data.location.reward._id
                });

                if (user && user._id)
                    checkin.user = user._id;

                app.CheckinModel.savePromise(checkin)
                    .then(function () {
                        return app.CheckinModel.getByPhoneAtCompany(data.location.company, phone);
                    })
                    .then(function (checkins) {
                        data.checkins = checkins;
                        data.totalCheckins = checkins.length;
                        data.checkinsRequired = data.location.reward.checkinsRequired;
                        data.checkinsTowardsReward = data.totalCheckins % data.checkinsRequired;
                        data.rewardEarned = ( data.checkinsTowardsReward == 0 && data.totalCheckins > 0 );
                        data.theme = app.TemplateHelpers.getTheme('orange');

                        if (data.rewardEarned) {
                            var reward = new app.RewardModel({
                                company: data.location.company._id,
                                companyReward: data.location.reward._id,
                                location: data.location._id,
                                phone: phone
                            });

                            app.RewardModel.savePromise(reward)
                                .then(function (saved) {
                                    data.reward = saved;
                                    return app.PhoneHelpers.sendRewardMessage(data, phone);
                                })
                                .then(function(){
                                    res.json(data);
                                })
                                .catch(console.log)
                                .done();
                        } else {
                            data.rowWidth = app.TemplateHelpers.getRowWidth(data.checkinsRequired);
                            data.rowRange = parseInt(1 + Math.floor(data.checkinsRequired / data.rowWidth));
                            data.theme = app.TemplateHelpers.getTheme('orange');
                            data.cardMessage = data.checkinsRequired - data.checkinsEarned + ' More check-in(s) to earn a ' + data.location.reward.name;

                            res.json(data);
                        }
                    })
                    .catch(app.ErrorHelpers.notFound(res))
                    .done();
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return ConfirmRoute;
};