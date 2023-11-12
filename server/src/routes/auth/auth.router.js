const express = require('express');
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
    const {
        display_name,
        photos,
        id
    } = req.user?.profile;
    return res.status(200).json({
        user: {
            display_name,
            image_url: photos[1].value,
            id
        }, 
        client: req.session?.client_token
    });
});

authRouter.get('/logout', (_req, res) => {
    res.clearCookie('session');
    return res.clearCookie('session.sig').json({
        msg: 'Logged Out'
    });
});

module.exports = authRouter;