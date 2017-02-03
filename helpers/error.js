var helpers = {};

helpers.notFound = function(res) {
    return function(err){
        console.log(err);
        res.status(404).json({ error: err.message ? err.message : err });
    };
};

module.exports = helpers;