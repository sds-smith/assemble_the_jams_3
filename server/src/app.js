const path = require('path')
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const authRouter = require('./routes/auth/auth.router');
const api = require('./routes/api');

const config = {
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
};

const session = cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    httpOnly: false
});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'build')));
app.use(session);
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/v1', api);

module.exports = app;