const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateRewardController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.getById(req.params.companyId, req.user)
            .then( (company) => {
                if (!req.user.superUser && !company.adminUser.equals(req.user._id))
                    return Promise.reject('You are not an admin for this company.');

                const model = new app.RewardModel(req.body);
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
