module.exports = (app) => {
    const CompanyRewardsRoute = (req, res) => {

        app.CompanyRewardModel.getByCompany(req.params.companyId)
            .then( (companyRewards) => {
                res.json(companyRewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardsRoute;
};
