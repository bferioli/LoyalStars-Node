var time = require('time');
var helpers = {};

helpers.getLocationOpenNow = function(location) {
    if (!location.scheduleEnabled)
        return true;

    if (!location.openHour && !location.openDays)
        return true;

    var openToday = false,
        openNow = false,
        openPastMidnight = location.openHour + location.openDurationHours >= 24;

    var now = new time.Date();
    if (location.timezone)
        now.setTimezone(location.timezone);

    if (location.openDays) {
        var days = location.openDays.split(',');
        for (i = 0; i < days.length; i++){
            var day = parseInt(days[i]);
            if (day === now.getDay())
                openToday = true;
            else if (openPastMidnight && day + 1 == now.getDay())
                openToday = true;
        }
    } else {
        openToday = true;
    }

    if (location.openHour) {
        if (openToday && now.getHours() >= location.openHour) {
            var openMinute = location.openMinute || 0,
                openTime = new time.Date();

            openTime.setHours(location.openHour, openMinute);
            if (location.timezone)
                openTime.setTimezone(location.timezone, true);

            var closeTime = new time.Date(openTime.getTime());
            closeTime.setHours(closeTime.getHours() + location.openDurationHours, closeTime.getMinutes() + location.openDurationMinutes);
            if (location.timezone)
                openTime.setTimezone(location.timezone, true);

            if (now < closeTime)
                openNow = true;
        }
    } else {
        openNow = true;
    }

    return openNow;
};

module.exports = helpers;