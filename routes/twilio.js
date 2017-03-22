const twilio = require('twilio');

module.exports = (app) => {
    const TwilioRoute = (req, res) => {
        const data = {},
            body = req.body.Body,
            phone = req.body.From.substring(2),
            phoneEncoded = app.PhoneHelpers.encodePhone(phone),
            twiml = new twilio.TwimlResponse();

        app.LocationModel.getByCheckinCode(body.toUpperCase())
            .then( (location) => {
                if (!location) {
                    throw new Error("Sorry, we can't seem to find the business you're looking for!");
                }
                data.location = location;
                return app.RewardModel.getByPhone(phone);
            })
            .then( (reward) => {
                if (reward) {
                    twiml.message(`You have a ${reward.companyReward.name} waiting at ${data.location.name}, to claim visit ${process.env.URL_PATH}/api/rewards/${reward.id}/${phoneEncoded}`);
                } else {
                    twiml.message(`To complete your check in at ${data.location.name}, please visit ${process.env.URL_PATH}/api/checkin/${data.location.checkinCode}/${phoneEncoded}`);
                }

                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
            })
            .catch( (error) => {
                twiml.message(error.message);
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
            })
            .done();
    };

    return TwilioRoute;
};