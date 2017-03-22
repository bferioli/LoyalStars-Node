module.exports = (app) => {
    const DeleteCheckinsByCompanyRoute = (req, res) => {

        app.CheckinModel.deleteByCompany(req.params.companyId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCheckinsByCompanyRoute;
};