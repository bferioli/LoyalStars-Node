module.exports = (app) => {
    const CreateCompanyRoute = (req, res) => {

        const model = new app.CompanyModel(req.body);

        app.CompanyModel.savePromise(model)
            .then( (company) => {
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CreateCompanyRoute;
};
