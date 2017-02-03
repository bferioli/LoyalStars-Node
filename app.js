require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

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

app.ErrorHelpers = require('./helpers/error.js');
app.PhoneHelpers = require('./helpers/phone.js');
app.TemplateHelpers = require('./helpers/template.js');
app.TimeHelpers = require('./helpers/time.js');

// Checkin flow routes

var CheckinRoute = require('./routes/api/checkins/checkin')(app);
var ConfirmRoute = require('./routes/api/checkins/confirm')(app);
app.get("/api/checkin/:checkinCode/:phone", CheckinRoute);
app.get("/api/checkin/:checkinCode/:phone/confirm", ConfirmRoute);

// Reward Flow Routes

var RewardRoute = require('./routes/api/rewards/reward')(app);
app.get("/api/rewards/:rewardId/:phone", RewardRoute);

// Checkin query routes

var CheckinsRoute = require('./routes/api/checkins/checkins')(app);
var CheckinsByCompanyRoute = require('./routes/api/checkins/checkinsByCompany')(app);
var CheckinsByLocationRoute = require('./routes/api/checkins/checkinsByLocation')(app);
var DeleteCheckinsByCompanyRoute = require('./routes/api/checkins/deleteCheckinsByCompany')(app);
app.get("/api/checkins", CheckinsRoute);
app.get("/api/company/:companyId/checkins", CheckinsByCompanyRoute);
app.get("/api/company/:companyId/locations/:locationId/checkins", CheckinsByLocationRoute);
app.delete("/api/company/:companyId/checkins", DeleteCheckinsByCompanyRoute);

// Company query routes

var CompanyRoute = require('./routes/api/companies/company')(app);
var CompaniesRoute = require('./routes/api/companies/companies')(app);
var CreateCompanyRoute = require('./routes/api/companies/createCompany')(app);
var DeleteCompanyRoute = require('./routes/api/companies/deleteCompany')(app);
var UpdateCompanyRoute = require('./routes/api/companies/updateCompany')(app);
app.get("/api/companies/:companyId", CompanyRoute);
app.get("/api/companies", CompaniesRoute);
app.post("/api/companies", CreateCompanyRoute);
app.delete("/api/companies/:companyId", DeleteCompanyRoute);
app.put("/api/companies/:companyId", UpdateCompanyRoute);

// CompanyReward query routes

var CompanyRewardRoute = require('./routes/api/companyRewards/companyReward')(app);
var CompanyRewardsRoute = require('./routes/api/companyRewards/companyRewards')(app);
var CreateCompanyRewardRoute = require('./routes/api/companyRewards/createCompanyReward')(app);
var DeleteCompanyRewardRoute = require('./routes/api/companyRewards/deleteCompanyReward')(app);
var UpdateCompanyRewardRoute = require('./routes/api/companyRewards/updateCompanyReward')(app);
app.get("/api/companies/:companyId/companyRewards/:companyRewardId", CompanyRewardRoute);
app.get("/api/companies/:companyId/companyRewards", CompanyRewardsRoute);
app.post("/api/companies/:companyId/companyRewards", CreateCompanyRewardRoute);
app.delete("/api/companies/:companyId/companyRewards/:companyRewardId", DeleteCompanyRewardRoute);
app.put("/api/companies/:companyId/companyRewards/:companyRewardId", UpdateCompanyRewardRoute);

// Location query routes

var LocationRoute = require('./routes/api/locations/location')(app);
var LocationsRoute = require('./routes/api/locations/locations')(app);
var CreateLocationRoute = require('./routes/api/locations/createLocation')(app);
var DeleteLocationRoute = require('./routes/api/locations/deleteLocation')(app);
var UpdateLocationRoute = require('./routes/api/locations/updateLocation')(app);
app.get("/api/companies/:companyId/locations/:locationId", LocationRoute);
app.get("/api/companies/:companyId/locations", LocationsRoute);
app.post("/api/companies/:companyId/locations", CreateLocationRoute);
app.delete("/api/companies/:companyId/locations/:locationId", DeleteLocationRoute);
app.put("/api/companies/:companyId/locations/:locationId", UpdateLocationRoute);

// Reward query routes

var RewardsRoute = require('./routes/api/rewards/rewards')(app);
var RewardsByCompanyRoute = require('./routes/api/rewards/rewardsByCompany')(app);
var RewardsByLocationRoute = require('./routes/api/rewards/rewardsByLocation')(app);
app.get("/api/rewards", RewardsRoute);
app.get("/api/companies/:companyId/rewards", RewardsByCompanyRoute);
app.get("/api/locations/:locationId/rewards", RewardsByLocationRoute);

var TwilioRoute = require('./routes/twilio')(app);

app.post("/twilio/checkin", TwilioRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);

module.exports = app;
