module.exports = (app) => {
    const CompaniesRoute = (req, res) => {

        app.CompanyModel.getAll()
            .then( (companies) => {
                res.json(companies);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompaniesRoute;
};
