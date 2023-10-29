const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const config = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
    done(null, profile)
};

const googleAuthStrategy = new Strategy(AUTH_OPTIONS, verifyCallback);

const googleAuthRouter = express.Router();

googleAuthRouter.get('/', 
    passport.authenticate('google', {
        scope: ['email','profile']
    }));

googleAuthRouter.get('/callback', 
    passport.authenticate('google', {}), 
    (req, res) => {
        const isLoggedIn = req.isAuthenticated() && req.user;
        if (isLoggedIn) {
            return res.redirect(`/`)
        } else {
            return res.redirect('/sign-in/oops')
        };
    });

module.exports = {
    googleAuthStrategy, 
    googleAuthRouter,
};