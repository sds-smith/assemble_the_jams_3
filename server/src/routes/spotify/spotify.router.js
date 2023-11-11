const express = require('express');
const {httpsSearch, httpsSavePlaylist} = require('../../models/spotify.model');

const spotifyRouter = express.Router();

spotifyRouter.use('/search', httpsSearch);
spotifyRouter.use('/save_playlist', httpsSavePlaylist)

module.exports = spotifyRouter;