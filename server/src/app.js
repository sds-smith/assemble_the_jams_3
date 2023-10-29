const path = require('path');
const express = require('express');

const authRouter = require('./routes/auth/auth.router');
const api = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRouter);
app.use('/v1', api);

module.exports = app;