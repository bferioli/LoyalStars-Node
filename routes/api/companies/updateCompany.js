module.exports = (app) => {
    const UpdateCompanyRoute = (req, res) => {

        app.CompanyModel.updateById(req.params.companyId, req.body)
            .then( (company) => {
                res.json(company);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateCompanyRoute;
};
