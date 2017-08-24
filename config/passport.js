/*
 Local authentication using Passport
 Thanks to Chris Sevilleja at Scotch.io
 https://scotch.io/tutorials/easy-node-authentication-setup-and-local
 */

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        app.UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
        session: false
    },
    function(req, email, password, done) {
        app.UserModel.findOne({ 'email' :  email }, function(err, existing) {
            if (err)
                return done(err);

            if (existing) {
                return done(null, false, done('That email is already taken.'));
            } else {
                const user = new app.UserModel();
                user.email = email;
                user.password = user.generateHash(password);

                user.save(function(err) {
                    if (err)
                        throw err;

                    const payload = { _id: user._id, email: user.email };
                    const token = jwt.sign(payload, process.env.JWT_SECRET);

                    return done(null, { token, user });
                });
            }

        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
        session: false
    },
    function(req, email, password, done) { // callback with email and password from our form
        app.UserModel.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, done('No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (!user.validPassword(password))
                return done(null, false, done('Oops! Wrong password.' )); // create the loginMessage and save it to session as flashdata

            const payload = { _id: user._id, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            return done(null, { token, user });
        });

    }));

    passport.use('jwt-verify', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.JWT_SECRET
    },
    function(jwt_payload, done) {
        app.UserModel.findOne({ '_id' :  jwt_payload._id }, function(err, user) {
            if (err)
                return done(err);
            if (user)
                return done(null, { user });
            else
                return done(null, false);
        });
    }));

};