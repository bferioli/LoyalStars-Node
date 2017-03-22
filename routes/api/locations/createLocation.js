module.exports = (app) => {
    const CreateLocationRoute = (req, res) => {

        const model = new app.LocationModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                model.set({company: company._id});
                app.LocationModel.savePromise(model)
                    .then( (location) => {
                        res.json(location);
                    })
                    .catch(app.ErrorHelpers.notFound(res))
                    .done();
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CreateLocationRoute;
};
