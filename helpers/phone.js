var helpers = {};
var bases = require('bases');
var Q = require('q');
var twilio = require('twilio');
var TWILIO_ACCOUNT_SID = 'AC0050f813954db69b3135e0b2ffec610e';
var TWILIO_AUTH_TOKEN = '81dc7c26ee78c156b15a3a53e71c5d3a';
var TWILIO_NUMBER = '+19292388238';

helpers.encodePhone = function(phone) {
    return bases.toBase62(phone);
};

helpers.decodePhone = function(encoded) {
    return bases.fromBase62(encoded);
};

helpers.sendRewardMessage = function(data, phone) {
    var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    var deferred = Q.defer();

    client.sms.messages.create({
        to: '+1' + phone,
        from: TWILIO_NUMBER,
        body: "You've earned a reward at " + data.location.name + ", to claim visit http://4654b033.ngrok.io/reward/" + data.reward._id + "/" + phone
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