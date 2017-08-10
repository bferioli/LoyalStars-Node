module.exports = (app, passport) => {
    const companies = require('express').Router();

    // Company query routes

    const CompanyController = require('../../controllers/api/companies/company')(app);
    const CompaniesController = require('../../controllers/api/companies/companies')(app);
    const CreateCompanyController = require('../../controllers/api/companies/createCompany')(app);
    const DeleteCompanyController = require('../../controllers/api/companies/deleteCompany')(app);
    const UpdateCompanyController = require('../../controllers/api/companies/updateCompany')(app);

    const CompanyLocationsController = require('../../controllers/api/locations/locations')(app);
    const CreateCompanyLocationController = require('../../controllers/api/locations/createLocation')(app);
    const UpdateCompanyLocationController = require('../../controllers/api/locations/updateLocation')(app);

    const CompanyCheckinsController = require('../../controllers/api/checkins/checkinsByCompany')(app);
    const DeleteCompanyCheckinsController = require('../../controllers/api/checkins/deleteCheckinsByCompany')(app);

    const CompanyRewardsController = require('../../controllers/api/rewards/rewards')(app);
    const CreateCompanyRewardController = require('../../controllers/api/rewards/createReward')(app);
    const CompanyEarnedRewardsController = require('../../controllers/api/earnedRewards/earnedRewardsByCompany')(app);

    companies.get("/:companyId", CompanyController);
    companies.get("/", passport.authenticate('jwt-verify'), CompaniesController);
    companies.post("/", passport.authenticate('jwt-verify'), CreateCompanyController);
    companies.delete("/:companyId", passport.authenticate('jwt-verify'), DeleteCompanyController);
    companies.put("/:companyId", passport.authenticate('jwt-verify'), UpdateCompanyController);

    companies.get("/:companyId/locations", passport.authenticate('jwt-verify'), CompanyLocationsController);
    companies.post("/:companyId/locations", passport.authenticate('jwt-verify'), CreateCompanyLocationController);
    companies.put("/:companyId/locations/:locationId", passport.authenticate('jwt-verify'), UpdateCompanyLocationController);

    companies.get("/:companyId/checkins", passport.authenticate('jwt-verify'), CompanyCheckinsController);
    companies.delete("/:companyId/checkins", passport.authenticate('jwt-verify'), DeleteCompanyCheckinsController);

    companies.get("/:companyId/rewards", passport.authenticate('jwt-verify'), CompanyRewardsController);
    companies.post("/:companyId/rewards", passport.authenticate('jwt-verify'), CreateCompanyRewardController);
    companies.get("/:companyId/earned-rewards", passport.authenticate('jwt-verify'), CompanyEarnedRewardsController);

    return companies;
};