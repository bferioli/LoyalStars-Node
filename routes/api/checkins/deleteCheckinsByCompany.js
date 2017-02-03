module.exports = function (app) {

    var DeleteCheckinsByCompanyRoute = function(req, res){

        app.CheckinModel.deleteByCompany(req.params.companyId)
            .then(function(){
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCheckinsByCompanyRoute;
};