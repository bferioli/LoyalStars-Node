module.exports = (app) => {
    const DeleteCompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.deleteById(req.params.companyRewardId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCompanyRewardRoute;
};
