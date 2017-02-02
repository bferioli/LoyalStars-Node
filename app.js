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

app.PhoneHelpers = require('./helpers/phone.js');
app.TemplateHelpers = require('./helpers/template.js');
app.TimeHelpers = require('./helpers/time.js');

var CheckinRoute = require('./routes/checkins/checkin')(app);
var ConfirmRoute = require('./routes/checkins/confirm')(app);

var CompanyRoute = require('./routes/companies/company')(app);
var CompaniesRoute = require('./routes/companies/companies')(app);
var CreateCompanyRoute = require('./routes/companies/createCompany')(app);
var UpdateCompanyRoute = require('./routes/companies/updateCompany')(app);

var LocationRoute = require('./routes/locations/location')(app);
var LocationsRoute = require('./routes/locations/locations')(app);
var CreateLocationRoute = require('./routes/locations/createLocation')(app);
var UpdateLocationRoute = require('./routes/locations/updateLocation')(app);

var RewardRoute = require('./routes/rewards/reward')(app);
var RewardsRoute = require('./routes/rewards/rewards')(app);
var RewardsByCompanyRoute = require('./routes/rewards/rewardsByCompany')(app);
var RewardsByLocationRoute = require('./routes/rewards/rewardsByLocation')(app);

var TwilioRoute = require('./routes/twilio')(app);

app.get("/checkin/:checkinCode/:phone", CheckinRoute);
app.get("/checkin/:checkinCode/:phone/confirm", ConfirmRoute);

app.get("/companies/:companyId", CompanyRoute);
app.get("/companies", CompaniesRoute);
app.post("/companies", CreateCompanyRoute);
app.put("/companies/:companyId", UpdateCompanyRoute);

app.get("/companies/:companyId/locations/:locationId", LocationRoute);
app.get("/companies/:companyId/locations", LocationsRoute);
app.post("/companies/:companyId/locations", CreateLocationRoute);
app.put("/companies/:companyId/locations/:locationId", UpdateLocationRoute);

app.get("/rewards/:rewardId/:phone", RewardRoute);
app.get("/rewards", RewardsRoute);
app.get("/companies/:companyId/rewards", RewardsByCompanyRoute);
app.get("/locations/:locationId/rewards", RewardsByLocationRoute);


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
