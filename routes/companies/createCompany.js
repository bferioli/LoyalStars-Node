module.exports = function (app) {
    var CreateCompanyRoute = function (req, res) {

        var model = new app.CompanyModel(req.body);

        app.CompanyModel.savePromise(model)
            .then(function(company){
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CreateCompanyRoute;
};
