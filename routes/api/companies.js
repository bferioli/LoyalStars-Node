module.exports = (app) => {
    const companies = require('express').Router();

    // Company query routes

    const CompanyController = require('../../controllers/api/companies/company')(app);
    const CompaniesController = require('../../controllers/api/companies/companies')(app);
    const CreateCompanyController = require('../../controllers/api/companies/createCompany')(app);
    const DeleteCompanyController = require('../../controllers/api/companies/deleteCompany')(app);
    const UpdateCompanyController = require('../../controllers/api/companies/updateCompany')(app);

    const CompanyLocationsController = require('../../controllers/api/locations/locations')(app);
    const CreateCompanyLocationController = require('../../controllers/api/locations/createLocation')(app);

    const CompanyCheckinsController = require('../../controllers/api/checkins/checkinsByCompany')(app);
    const DeleteCompanyCheckinsController = require('../../controllers/api/checkins/deleteCheckinsByCompany')(app);

    const CompanyRewardsController = require('../../controllers/api/rewards/rewards')(app);
    const CreateCompanyRewardController = require('../../controllers/api/rewards/createReward')(app);
    const CompanyEarnedRewardsController = require('../../controllers/api/earnedRewards/earnedRewardsByCompany')(app);

    companies.get("/:companyId", CompanyController);
    companies.get("/", CompaniesController);
    companies.post("/", CreateCompanyController);
    companies.delete("/:companyId", DeleteCompanyController);
    companies.put("/:companyId", UpdateCompanyController);

    companies.get("/:companyId/locations", CompanyLocationsController);
    companies.post("/:companyId/locations", CreateCompanyLocationController);

    companies.get("/:companyId/checkins", CompanyCheckinsController);
    companies.delete("/:companyId/checkins", DeleteCompanyCheckinsController);

    companies.get("/:companyId/rewards", CompanyRewardsController);
    companies.post("/:companyId/rewards", CreateCompanyRewardController);
    companies.get("/:companyId/earned-rewards", CompanyEarnedRewardsController);

    return companies;
};