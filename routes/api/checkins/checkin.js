const ErrorHelpers = require('../../../helpers/error.js');
const PhoneHelpers = require('../../../helpers/phone.js');
const TemplateHelpers = require('../../../helpers/template.js');

module.exports = (app) => {
    const CheckinRoute = (req, res) => {
        const data = {},
            phone = req.params.phone ? PhoneHelpers.decodePhone(req.params.phone) : '';

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then( (location) => {
                if (!location) {
                    return Promise.reject('Location not found.');
                }
                data.location = location;
                return app.CheckinModel.getByPhoneAtCompany(location.company, phone);
            })
            .then( (checkins) => {
                data.checkins = checkins;
                data.totalCheckins = checkins.length;
                data.checkinsRequired = data.location.reward.checkinsRequired;
                data.checkinsEarned = data.totalCheckins % data.checkinsRequired;
                data.rewardEarned = ( data.checkinsEarned == 0 && data.totalCheckins > 0 );
                data.rowWidth = TemplateHelpers.getRowWidth( data.checkinsRequired );
                data.rowRange = parseInt( 1 + Math.floor( data.checkinsRequired / data.rowWidth ) );
                data.theme = TemplateHelpers.getTheme('orange');

                res.json(data);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinRoute;
};
