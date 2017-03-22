module.exports = (app) => {
    const RewardRoute = (req, res) => {
        const data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.RewardModel.getById(req.params.rewardId)
            .then( (reward) => {
                res.json(reward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardRoute;
};
