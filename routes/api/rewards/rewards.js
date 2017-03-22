module.exports = (app) => {
    const RewardsRoute = (req, res) => {

        app.RewardModel.getAll()
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsRoute;
};
