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

app.TemplateHelpers = require('./helpers/template.js');
app.TimeHelpers = require('./helpers/time.js');

var CheckinRoute = require('./routes/checkin')(app, mongoose);
var ConfirmRoute = require('./routes/confirm')(app, mongoose);
app.get("/checkin/:checkinCode/:phone", CheckinRoute);
app.get("/checkin/:checkinCode/:phone/confirm", ConfirmRoute);

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
