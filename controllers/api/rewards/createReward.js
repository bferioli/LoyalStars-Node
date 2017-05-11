const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateRewardController = (req, res) => {

        const model = new app.RewardModel(req.body);

        app.CompanyModel.getById(req.params.companyId, req.user)
            .then( (company) => {
                model.set({company: company._id});
                return app.RewardModel.savePromise(model);
            })
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateRewardController;
};
