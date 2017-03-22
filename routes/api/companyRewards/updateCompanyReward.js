module.exports = (app) => {
    const UpdateCompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.updateById(req.params.companyRewardId, req.body)
            .then( (companyReward) => {
                res.json(companyReward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateCompanyRewardRoute;
};
