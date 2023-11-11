const express = require('express')
const spotifyRouter = require('./spotify/spotify.router');

const api = express.Router();

api.use('/spotify', spotifyRouter);

module.exports = api;