module.exports = (app) => {
    const CompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.getById(req.params.companyRewardId)
            .then( (companyReward) => {
                res.json(companyReward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardRoute;
};
