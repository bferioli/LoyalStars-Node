module.exports = (app) => {

    const RewardsByCompanyRoute = (req, res) => {

        app.RewardModel.getByCompany(req.params.companyId)
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsByCompanyRoute;
};
