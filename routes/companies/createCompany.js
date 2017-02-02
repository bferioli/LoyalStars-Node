module.exports = function (app) {
    var CreateCompanyRoute = function (req, res) {

        var model = new app.CompanyModel(req.body);

        app.CompanyModel.savePromise(model)
            .then(function(company){
                res.json(company);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Reward not found.');
            })
            .done();
    };

    return CreateCompanyRoute;
};
