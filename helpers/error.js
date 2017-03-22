const helpers = {};

helpers.notFound = (res) => {
    return (err) => {
        console.log(err);
        res.status(404).json({ error: err.message ? err.message : err });
    };
};

module.exports = helpers;