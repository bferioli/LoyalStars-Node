module.exports = function (app) {
    var UpdateCompanyRoute = function(req, res){

        app.CompanyModel.updateById(req.params.companyId, req.body)
            .then(function(company){
                res.json(company);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Company not found.');
            })
            .done();
    };

    return UpdateCompanyRoute;
};
