const helpers = {};
const moment = require('moment');
const time = require('time');

helpers.checkinsTodayFilter = (checkin) => {
    const startOfDay = moment().startOf('day');
    return moment(checkin.date).isAfter(startOfDay);
};

helpers.checkinsLastTwoHoursFilter = (checkin) => {
    const twoHoursAgo = moment().subtract(2,'hours');
    return moment(checkin.date).isAfter(twoHoursAgo);
};

helpers.getLocationOpenNow = (location) => {
    if (!location.scheduleEnabled || !location.hours.length)
        return true;

    let openNow = false,
        now = new time.Date();

    if (location.timezone)
        now.setTimezone(location.timezone);

    const today = location.hours.filter( (hours) => hours.day === now.getDay() )[0];

    if (today) {
        const openTime = today.openTime.split(':'),
            openMinutes = Number(openTime[0]) * 60 + Number(openTime[1]),
            closeTime = openMinutes + ( today.openDuration * 60 ),
            nowMinutes = now.getHours() * 60 + now.getMinutes();

        openNow = nowMinutes >= openMinutes && nowMinutes < closeTime;
    }

    // Handle open past midnight situations
    if (!openNow) {
        const yesterday = location.hours.filter( (hours) => hours.day === now.getDay() - 1 )[0];

        if (yesterday) {
            const openTime = yesterday.openTime.split(':'),
                closeTime = Number(openTime[0]) * 60 + Number(openTime[1]) + ( yesterday.openDuration * 60 ),
                nowMinutes = now.getHours() * 60 + now.getMinutes();

            if (closeTime > 1440) {
                openNow = nowMinutes < ( closeTime - 1440 );
            }
        }
    }

    return openNow;
};

module.exports = helpers;