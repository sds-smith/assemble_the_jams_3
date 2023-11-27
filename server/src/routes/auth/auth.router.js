import express from 'express';
import passport from 'passport';
import { spotifyAuthStrategy, spotifyAuthRouter } from './spotify-auth.router.js';

import dotenv from 'dotenv';
dotenv.config();

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
    const {user: {profile}} = req;
    const {
        displayName,
        photos,
        id
    } = profile;
    return res.status(200).json({
        user: {
            display_name: displayName,
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

export default authRouter;