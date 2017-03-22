module.exports = (app) => {
    const DeleteLocationRoute = (req, res) => {

        app.LocationModel.deleteById(req.params.locationId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteLocationRoute;
};
