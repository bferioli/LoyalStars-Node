const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Authentication-specific
const passport = require('passport');
const flash    = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

if (app.get('env') !== 'production') {
  require('dotenv').config();
}

const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

app.CheckinModel = require('./models/checkin.js')(mongoose);
app.CompanyModel = require('./models/company.js')(mongoose);
app.EarnedRewardModel = require('./models/earnedReward.js')(mongoose);
app.LocationModel = require('./models/location.js')(mongoose);
app.RewardModel = require('./models/reward.js')(mongoose);
app.SubscriptionModel = require('./models/subscription.js')(mongoose);
app.UserModel = require('./models/user.js')(mongoose);

require('./config/passport')(app, passport);

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

// Authentication-specific
app.use(session({
  name: 'loyl-session',
  secret: 'keepthemcomingback', // TODO: store secret in .env
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Connect all our routes to our application
app.use('/', routes(app, passport));

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

app.listen(process.env.PORT);

module.exports = app;
