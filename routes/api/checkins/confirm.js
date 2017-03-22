const moment = require('moment');
const Q = require('q');

module.exports = (app) => {
    const ConfirmRoute = (req, res) => {
        const data = {};
        const phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';


        Q.all([ app.LocationModel.getByCheckinCode(req.params.checkinCode),
                app.UserModel.getByPhone(phone) ])
            .spread( (location, user) => {
                data.location = location;
                data.user = user || {};
                if (req.body.superUser) data.user.superUser = true;
                return app.CheckinModel.getByPhoneAtCompany(location.company, phone);
            })
            .then( (checkins) => {
                return Q.all([
                    app.GeoHelpers.geoFence({ request: req.body, location: data.location, user: data.user }),
                    app.TimeHelpers.timeFence({ checkins, location: data.location, user: data.user })
                ]);
            })
            .then( () => {
                const checkin = new app.CheckinModel({
                    company: data.location.company._id,
                    location: data.location._id,
                    phone: phone,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    accuracy: req.body.accuracy,
                    reward: data.location.reward._id
                });

                if (data.user && data.user._id)
                    checkin.user = data.user._id;

                return app.CheckinModel.savePromise(checkin);
            })
            .then( () => {
                return app.CheckinModel.getByPhoneAtCompany(data.location.company, phone);
            })
            .then( (checkins) => {
                data.checkins = checkins;
                data.totalCheckins = checkins.length;
                data.checkinsRequired = data.location.reward.checkinsRequired;
                data.checkinsTowardsReward = data.totalCheckins % data.checkinsRequired;
                data.rewardEarned = ( data.checkinsTowardsReward == 0 && data.totalCheckins > 0 );
                data.rowWidth = app.TemplateHelpers.getRowWidth(data.checkinsRequired);
                data.rowRange = parseInt(1 + Math.floor(data.checkinsRequired / data.rowWidth));
                data.theme = app.TemplateHelpers.getTheme('orange');

                if (data.rewardEarned) {
                    const reward = new app.RewardModel({
                        company: data.location.company._id,
                        companyReward: data.location.reward._id,
                        location: data.location._id,
                        phone: phone
                    });

                    return app.RewardModel.savePromise(reward);
                } else {
                    const deferred = Q.defer();
                    deferred.resolve();
                    return deferred.promise;
                }
            })
            .then( (reward) => {
                if (reward) {
                    data.reward = reward;
                    app.PhoneHelpers.sendRewardMessage(data, phone);
                }

                res.json(data);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return ConfirmRoute;
};