const helpers = {};

helpers.getRowWidth = (checkinsRequired) => {
    let rowWidth;
    if (checkinsRequired < 8)
        rowWidth = checkinsRequired;
    else if (checkinsRequired % 2 === 0)
        rowWidth = (checkinsRequired / 2 < 8) ? checkinsRequired / 2 : 6;
    else
        rowWidth = (checkins_required / 2 < 8) ? 5 : 7;
    return rowWidth;
};

helpers.getTheme = (color) => {
    var themes = {
        'orange': {
            'class': 'orange',
            'color': '#BB5F06'
        },
        'blue': {
            'class': 'blue',
            'color': '#2976A9'
        },
        'pink': {
            'class': 'pink',
            'color': '#B8253E'
        },
        'green': {
            'class': 'green',
            'color': '#288108'
        }
    };

    return themes[color];
};

module.exports = helpers;