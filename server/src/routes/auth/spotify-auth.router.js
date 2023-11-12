const express = require('express')
const passport = require('passport');
const { getClientToken } = require('./client-token');
const SpotifyStrategy = require('passport-spotify').Strategy;

require('dotenv').config();

const config = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/spotify/callback',
    clientID: config.SPOTIFY_CLIENT_ID,
    clientSecret: config.SPOTIFY_CLIENT_SECRET,
    // passReqToCallback: true
  };

function verifyCallback(accessToken, _refreshToken, _expires_in, profile, done) {
      done(null, {accessToken, profile});
  };

const spotifyAuthStrategy = new SpotifyStrategy(AUTH_OPTIONS, verifyCallback);

const spotifyAuthRouter = express.Router();

spotifyAuthRouter.post('/get-client-token', getClientToken);

spotifyAuthRouter.get('/authenticate-user', 
    passport.authenticate('spotify', {
        scope: ['user-read-private', 'user-read-email', 'playlist-modify-public', 'streaming user-library-read', 'user-library-modify'],
        showDialog: true
    }));

spotifyAuthRouter.get('/callback', 
    passport.authenticate('spotify', {}), 
    (req, res) => {
        const isLoggedIn = req.isAuthenticated() && req.user;
        if (isLoggedIn) {
            return res.redirect(`/`)
        } else {
            return res.redirect('/sign-in/oops')
        };
    });

    module.exports = {
        spotifyAuthStrategy, 
        spotifyAuthRouter,
    };