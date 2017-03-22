const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateCompanyRewardRoute = (req, res) => {

        const model = new app.CompanyRewardModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                model.set({company: company._id});
                return app.CompanyRewardModel.savePromise(model);
            })
            .then( (companyReward) => {
                res.json(companyReward);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CreateCompanyRewardRoute;
};
