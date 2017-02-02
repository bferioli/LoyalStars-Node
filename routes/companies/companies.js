module.exports = function (app) {
    var CompaniesRoute = function(req, res){

        app.CompanyModel.getAll()
            .then(function(companies){
                res.json(companies);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return CompaniesRoute;
};
