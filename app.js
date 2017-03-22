require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/LoyalStars');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.CheckinModel = require('./models/checkin.js')(mongoose);
app.CompanyModel = require('./models/company.js')(mongoose);
app.CompanyRewardModel = require('./models/companyReward.js')(mongoose);
app.LocationModel = require('./models/location.js')(mongoose);
app.PromotionModel = require('./models/promotion.js')(mongoose);
app.RewardModel = require('./models/reward.js')(mongoose);
app.SubscriptionModel = require('./models/subscription.js')(mongoose);
app.UserModel = require('./models/user.js')(mongoose);

// Checkin flow routes

const CheckinRoute = require('./routes/api/checkins/checkin')(app);
const ConfirmRoute = require('./routes/api/checkins/confirm')(app);
app.get("/api/checkin/:checkinCode/:phone", CheckinRoute);
app.post("/api/checkin/:checkinCode/:phone/confirm", ConfirmRoute);

// Reward Flow Routes

const RewardRoute = require('./routes/api/rewards/reward')(app);
app.get("/api/rewards/:rewardId/:phone", RewardRoute);

// Checkin query routes

const CheckinsRoute = require('./routes/api/checkins/checkins')(app);
const CheckinsByCompanyRoute = require('./routes/api/checkins/checkinsByCompany')(app);
const CheckinsByLocationRoute = require('./routes/api/checkins/checkinsByLocation')(app);
const DeleteCheckinsByCompanyRoute = require('./routes/api/checkins/deleteCheckinsByCompany')(app);
app.get("/api/checkins", CheckinsRoute);
app.get("/api/company/:companyId/checkins", CheckinsByCompanyRoute);
app.get("/api/company/:companyId/locations/:locationId/checkins", CheckinsByLocationRoute);
app.delete("/api/company/:companyId/checkins", DeleteCheckinsByCompanyRoute);

// Company query routes

const CompanyRoute = require('./routes/api/companies/company')(app);
const CompaniesRoute = require('./routes/api/companies/companies')(app);
const CreateCompanyRoute = require('./routes/api/companies/createCompany')(app);
const DeleteCompanyRoute = require('./routes/api/companies/deleteCompany')(app);
const UpdateCompanyRoute = require('./routes/api/companies/updateCompany')(app);
app.get("/api/companies/:companyId", CompanyRoute);
app.get("/api/companies", CompaniesRoute);
app.post("/api/companies", CreateCompanyRoute);
app.delete("/api/companies/:companyId", DeleteCompanyRoute);
app.put("/api/companies/:companyId", UpdateCompanyRoute);

// CompanyReward query routes

const CompanyRewardRoute = require('./routes/api/companyRewards/companyReward')(app);
const CompanyRewardsRoute = require('./routes/api/companyRewards/companyRewards')(app);
const CreateCompanyRewardRoute = require('./routes/api/companyRewards/createCompanyReward')(app);
const DeleteCompanyRewardRoute = require('./routes/api/companyRewards/deleteCompanyReward')(app);
const UpdateCompanyRewardRoute = require('./routes/api/companyRewards/updateCompanyReward')(app);
app.get("/api/companies/:companyId/companyRewards/:companyRewardId", CompanyRewardRoute);
app.get("/api/companies/:companyId/companyRewards", CompanyRewardsRoute);
app.post("/api/companies/:companyId/companyRewards", CreateCompanyRewardRoute);
app.delete("/api/companies/:companyId/companyRewards/:companyRewardId", DeleteCompanyRewardRoute);
app.put("/api/companies/:companyId/companyRewards/:companyRewardId", UpdateCompanyRewardRoute);

// Location query routes

const LocationRoute = require('./routes/api/locations/location')(app);
const LocationsRoute = require('./routes/api/locations/locations')(app);
const CreateLocationRoute = require('./routes/api/locations/createLocation')(app);
const DeleteLocationRoute = require('./routes/api/locations/deleteLocation')(app);
const UpdateLocationRoute = require('./routes/api/locations/updateLocation')(app);
app.get("/api/companies/:companyId/locations/:locationId", LocationRoute);
app.get("/api/companies/:companyId/locations", LocationsRoute);
app.post("/api/companies/:companyId/locations", CreateLocationRoute);
app.delete("/api/companies/:companyId/locations/:locationId", DeleteLocationRoute);
app.put("/api/companies/:companyId/locations/:locationId", UpdateLocationRoute);

// Reward query routes

const RewardsRoute = require('./routes/api/rewards/rewards')(app);
const RewardsByCompanyRoute = require('./routes/api/rewards/rewardsByCompany')(app);
const RewardsByLocationRoute = require('./routes/api/rewards/rewardsByLocation')(app);
app.get("/api/rewards", RewardsRoute);
app.get("/api/companies/:companyId/rewards", RewardsByCompanyRoute);
app.get("/api/locations/:locationId/rewards", RewardsByLocationRoute);

const TwilioRoute = require('./routes/twilio')(app);
app.post("/twilio/checkin", TwilioRoute);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res ) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);

module.exports = app;
