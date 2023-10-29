const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const {googleAuthStrategy, googleAuthRouter} = require('./google-auth.router');
const {linkedinAuthStrategy, linkedinAuthRouter} = require('./linkedin-auth.router');

require('dotenv').config();

const config = {
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

passport.use(googleAuthStrategy);
passport.use(linkedinAuthStrategy);

passport.serializeUser( async (user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

const authRouter = express.Router();

authRouter.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    httpOnly: false
}))

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.use('/google', googleAuthRouter);
authRouter.use('/linkedin', linkedinAuthRouter);

authRouter.get('/get-session', (req, res) => {
    const user = req.user
    if (user) {
        return res.status(200).json(user)
    } 
})

authRouter.get('/logout', (req, res) => {
    res.clearCookie('session')
    return res.clearCookie('session.sig').json({
        msg: 'Logged Out'
    })
});

module.exports = authRouter;