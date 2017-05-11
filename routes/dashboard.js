module.exports = (app, passport) => {
    const dashboard = require('express').Router();

    // Dashboard routes

    const DashboardIndexController = require('../controllers/dashboard/index')(app, passport);
    const DashboardCompanyController = require('../controllers/dashboard/company')(app, passport);

    dashboard.get("/", DashboardIndexController);
    dashboard.get("/company/:slug", DashboardCompanyController);

    dashboard.get("/login", (req, res) => res.render( 'dashboard/login', { message: req.flash('loginMessage') } ));
    dashboard.get("/signup", (req, res) => res.render( 'dashboard/signup', { message: req.flash('signupMessage') } ));
    dashboard.get("/logout", (req, res) => {
        req.logout();
        res.redirect('/dashboard/login');
    });

    dashboard.post("/login", passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/dashboard/login',
        failureFlash : true
    }));

    dashboard.post("/signup", passport.authenticate('local-signup', {
        successRedirect : '/dashboard',
        failureRedirect : '/dashboard/signup',
        failureFlash : true
    }));

    return dashboard;
};