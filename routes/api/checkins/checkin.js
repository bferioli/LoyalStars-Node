module.exports = (app) => {
    const CheckinRoute = (req, res) => {
        const data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then( (location) => {
                if (!location) {
                    app.ErrorHelpers.notFound(res)('Location not found.');
                    return;
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
                data.rowWidth = app.TemplateHelpers.getRowWidth( data.checkinsRequired );
                data.rowRange = parseInt( 1 + Math.floor( data.checkinsRequired / data.rowWidth ) );
                data.theme = app.TemplateHelpers.getTheme('orange');

                res.json(data);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinRoute;
};
