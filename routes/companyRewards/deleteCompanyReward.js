module.exports = function (app) {
    var DeleteCompanyRewardRoute = function(req, res){

        app.CompanyRewardModel.deleteById(req.params.companyRewardId)
            .then(function(){
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCompanyRewardRoute;
};
