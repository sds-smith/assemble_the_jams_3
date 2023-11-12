const express = require('express')
const passport = require('passport');
const { spotifyAuthStrategy, spotifyAuthRouter } = require('./spotify-auth.router');

require('dotenv').config();

passport.use(spotifyAuthStrategy);

passport.serializeUser( async (user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

const authRouter = express.Router();

authRouter.use(passport.initialize());

authRouter.use('/spotify', spotifyAuthRouter);

authRouter.get('/get-session', (req, res) => {
    return res.status(200).json({
        user: req.user?.profile, 
        client: req.session?.client_token
    })
})

authRouter.get('/logout', (req, res) => {
    res.clearCookie('session')
    return res.clearCookie('session.sig').json({
        msg: 'Logged Out'
    })
});

module.exports = authRouter;