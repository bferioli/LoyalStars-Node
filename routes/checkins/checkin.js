module.exports = function (app) {
    var CheckinRoute = function(req, res){
        var data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then(function(location){
                if (!location) {
                    res.status(404).send('Location not found.');
                    return;
                }
                data.location = location;
                return app.CheckinModel.getByCompany(location.company, phone);
            })
            .then(function(checkins){
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
            .catch(function(err){
                console.log(err);
                res.status(404).send('Location not found.');
            })
            .done();
    };
    
    return CheckinRoute;
};
