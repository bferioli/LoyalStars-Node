const twilio = require('twilio');
const PhoneHelpers = require('../helpers/phone.js');

module.exports = (app) => {
    const TwilioController = (req, res) => {
        const data = {},
            body = req.body.Body,
            phone = req.body.From.substring(2),
            phoneEncoded = PhoneHelpers.encodePhone(phone),
            twiml = new twilio.TwimlResponse();

        app.LocationModel.getByCheckinCode(body.toUpperCase())
            .then( (location) => {
                if (!location) {
                    throw new Error("Sorry, we can't seem to find the business you're looking for!");
                }
                data.location = location;
                return app.EarnedRewardModel.getByPhone(phone);
            })
            .then( (earnedReward) => {
                if (earnedReward) {
                    twiml.message(`You have a ${earnedReward.reward.name} waiting at ${data.location.name}, to claim visit ${process.env.URL_PATH}/api/earned-rewards/${earnedReward.id}/${phoneEncoded}`);
                } else {
                    twiml.message(`To complete your check in at ${data.location.name}, please visit ${process.env.URL_PATH}/api/checkins/${data.location.checkinCode}/${phoneEncoded}`);
                }

                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
            })
            .catch( (error) => {
                twiml.message(error.message);
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
            });
    };

    return TwilioController;
};