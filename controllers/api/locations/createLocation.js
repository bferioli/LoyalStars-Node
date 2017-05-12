const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateLocationController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                if (!req.user.superUser && !company.adminUser.equals(req.user._id))
                    return Promise.reject('You are not an admin for this company.');

                const model = new app.LocationModel(req.body);
                model.set({company: company._id});
                return app.LocationModel.savePromise(model);
            })
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateLocationController;
};
