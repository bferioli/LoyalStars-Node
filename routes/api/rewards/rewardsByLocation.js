module.exports = (app) => {

    const RewardsByLocationRoute = (req, res) => {

        app.RewardModel.getByLocation(req.params.locationId)
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsByLocationRoute;
};
