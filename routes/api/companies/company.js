module.exports = (app) => {
    const CompanyRoute = (req, res) => {

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRoute;
};
