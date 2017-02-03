module.exports = function (app) {
    var CheckinsRoute = function(req, res){

        app.CheckinModel.getAll()
            .then(function(companies){
                res.json(companies);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsRoute;
};
