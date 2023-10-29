const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-linkedin-oauth2');

require('dotenv').config();

const config = {
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/linkedin/callback',
    clientID: config.LINKEDIN_CLIENT_ID,
    clientSecret: config.LINKEDIN_CLIENT_SECRET,
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile)
    })
}

const linkedinAuthStrategy = new Strategy(AUTH_OPTIONS, verifyCallback);

const linkedinAuthRouter = express.Router();

linkedinAuthRouter.get('/', 
    passport.authenticate('linkedin')
);

linkedinAuthRouter.get('/callback', 
    passport.authenticate('linkedin', {}), 
    (req, res) => {
        const isLoggedIn = req.isAuthenticated() && req.user;
        if (isLoggedIn) {
            return res.redirect(`/`)
        } else {
            return res.redirect('/sign-in/oops')
        };
    });

module.exports = {
    linkedinAuthStrategy, 
    linkedinAuthRouter,
};