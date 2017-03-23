module.exports = (app) => {
    const dashboard = require('express').Router();

    // Dashboard routes

    const DashboardIndexController = require('../controllers/dashboard/index')(app);
    const DashboardCompanyController = require('../controllers/dashboard/company')(app);

    dashboard.get("/", DashboardIndexController);
    dashboard.get("/company/:slug", DashboardCompanyController);

    return dashboard;
};