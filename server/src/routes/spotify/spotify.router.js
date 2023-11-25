const express = require('express');
const { httpsSearch, httpsSavePlaylist, httpsGetLikeStatus, httpsToggleLike } = require('../../controllers/spotify.controller');

const spotifyRouter = express.Router();

spotifyRouter.use('/search', httpsSearch);
spotifyRouter.use('/save_playlist', httpsSavePlaylist);
spotifyRouter.use('/get_like_status', httpsGetLikeStatus);
spotifyRouter.use('/toggle_like', httpsToggleLike);

module.exports = spotifyRouter;