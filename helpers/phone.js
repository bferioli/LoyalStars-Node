const helpers = {};
const bases = require('bases');
const twilio = require('twilio');

helpers.encodePhone = (phone) => {
    return bases.toBase62(phone);
};

helpers.decodePhone = (encoded) => {
    return bases.fromBase62(encoded);
};

helpers.sendRewardMessage = (data, phone) => {
    return new Promise( (resolve, reject) => {
        const client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const encodedPhone = helpers.encodePhone(phone);

        client.sms.messages.create({
            to: '+1' + phone,
            from: process.env.TWILIO_NUMBER,
            body: `You've earned a reward at ${data.location.name}, to claim visit ${process.env.URL_PATH}/api/rewards/${data.reward._id}/${encodedPhone}`
        }, (error, message) => {
            if (error)
                reject(new Error(error));
            else
                resolve(message);
        });
    });
};

module.exports = helpers;