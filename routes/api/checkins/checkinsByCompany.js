module.exports = (app) => {
    var CheckinsByCompanyRoute = (req, res) => {

        app.CheckinModel.getByCompany(req.params.companyId)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsByCompanyRoute;
};
