module.exports = function (app) {
    var CompanyRoute = function(req, res){;

        app.CompanyModel.getById(req.params.companyId)
            .then(function(company){
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRoute;
};
