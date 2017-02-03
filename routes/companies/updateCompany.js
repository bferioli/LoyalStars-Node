module.exports = function (app) {
    var UpdateCompanyRoute = function(req, res){

        app.CompanyModel.updateById(req.params.companyId, req.body)
            .then(function(company){
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateCompanyRoute;
};
