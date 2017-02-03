module.exports = function (app) {
    var CreateLocationRoute = function (req, res) {

        var model = new app.LocationModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then(function(company){
                model.set({company: company._id});
                app.LocationModel.savePromise(model)
                    .then(function(location){
                        res.json(location);
                    })
                    .catch(app.ErrorHelpers.notFound(res))
                    .done();
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CreateLocationRoute;
};
