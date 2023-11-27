import express from 'express';
import { httpsSearch, httpsSavePlaylist, httpsGetLikeStatus, httpsToggleLike } from '../../controllers/spotify.controller.js';

const spotifyRouter = express.Router();

spotifyRouter.use('/search', httpsSearch);
spotifyRouter.use('/save_playlist', httpsSavePlaylist);
spotifyRouter.use('/get_like_status', httpsGetLikeStatus);
spotifyRouter.use('/toggle_like', httpsToggleLike);

export default spotifyRouter;