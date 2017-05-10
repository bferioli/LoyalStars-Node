const ErrorHelpers = require('../../../helpers/error.js');
const GeoHelpers = require('../../../helpers/geolocation.js');
const PhoneHelpers = require('../../../helpers/phone.js');
const TemplateHelpers = require('../../../helpers/template.js');

module.exports = (app) => {
    const ConfirmController = (req, res) => {
        const data = {};
        const phone = req.params.phone ? PhoneHelpers.decodePhone(req.params.phone) : '';

        Promise
            .all([
                app.LocationModel.getByCheckinCode(req.params.checkinCode),
                app.UserModel.getByPhone(phone)
            ])
            .then( ([location, user]) => {
                data.location = location;
                data.user = user || {};
                if (req.body.superUser) data.user.superUser = true;
                return app.CheckinModel.getByPhoneAtCompany(location.company, phone);
            })
            .then( (checkins) => {
                return GeoHelpers.geoFence({ request: req.body, location: data.location, user: data.user });
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
                data.rowWidth = TemplateHelpers.getRowWidth(data.checkinsRequired);
                data.rowRange = parseInt(1 + Math.floor(data.checkinsRequired / data.rowWidth));
                data.theme = TemplateHelpers.getTheme('orange');

                if (data.rewardEarned) {
                    const earnedReward = new app.EarnedRewardModel({
                        company: data.location.company._id,
                        reward: data.location.reward._id,
                        location: data.location._id,
                        phone: phone
                    });

                    return app.EarnedRewardModel.savePromise(earnedReward);
                }

                return Promise.resolve();
            })
            .then( (earnedReward) => {
                if (earnedReward) {
                    data.reward = earnedReward;
                    PhoneHelpers.sendRewardMessage(data, phone);
                }

                res.json(data);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return ConfirmController;
};