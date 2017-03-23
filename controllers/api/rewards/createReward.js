const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateRewardRoute = (req, res) => {

        const model = new app.RewardModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                model.set({company: company._id});
                return app.RewardModel.savePromise(model);
            })
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateRewardRoute;
};
