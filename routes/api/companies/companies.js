module.exports = function (app) {
    var CompaniesRoute = function(req, res){

        app.CompanyModel.getAll()
            .then(function(companies){
                res.json(companies);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompaniesRoute;
};
