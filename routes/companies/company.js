module.exports = function (app) {
    var CompanyRoute = function(req, res){;

        app.CompanyModel.getById(req.params.companyId)
            .then(function(company){
                res.json(company);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Company not found.');
            })
            .done();
    };

    return CompanyRoute;
};
