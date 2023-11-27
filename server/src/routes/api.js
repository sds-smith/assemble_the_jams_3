import express from 'express';
import spotifyRouter from './spotify/spotify.router.js';

const api = express.Router();

api.use('/spotify', spotifyRouter);

export default api;