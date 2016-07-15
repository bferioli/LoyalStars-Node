var helpers = {};
var bases = require('bases');
var Q = require('q');
var twilio = require('twilio');

helpers.encodePhone = function(phone) {
    return bases.toBase62(phone);
};

helpers.decodePhone = function(encoded) {
    return bases.fromBase62(encoded);
};

helpers.sendRewardMessage = function(data, phone) {
    var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    var deferred = Q.defer();

    client.sms.messages.create({
        to: '+1' + phone,
        from: process.env.TWILIO_NUMBER,
        body: "You've earned a reward at " + data.location.name + ", to claim visit " + process.env.URL_PATH + "/reward/" + data.reward._id + "/" + phone
    }, function(error, message){
        if (error) {
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve(message);
        }
    });

    return deferred.promise;
};

module.exports = helpers;