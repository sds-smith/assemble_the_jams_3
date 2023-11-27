import {
  search,
  savePlaylist,
  getLikeStatus,
  toggleLike
} from '../models/spotify.model.js';

import dotenv from 'dotenv';
dotenv.config();

async function httpsSearch(req, res) {
  const { query } = req.query;
  const { client_token: {token} } = req.session;
  const searchResponse = await search({ query, token });
  const { status, searchResultsArray, recommendationsArray } = searchResponse;
  return res.status(status).json({searchResultsArray, recommendationsArray});
};

async function httpsSavePlaylist(req, res) {
  const { profile: { id }, accessToken } = req.user;
  const { playlistName, trackURIs } = req.body;
  const saveResponse = await savePlaylist({ id, accessToken, playlistName, trackURIs });
  const {
    status,
    message,
    playlist_name,
    playlistTracks,
    searchResults
 } = saveResponse;
 return res.status(status).json({
    message,
    playlistName: playlist_name,
    playlistTracks,
    searchResults
 });
};

async function httpsGetLikeStatus(req, res) {
  const { trackId } = req.body;
  const { accessToken } = req.user;

  const likeResponse = await getLikeStatus({trackId, accessToken});
  return res.status(likeResponse.status).json({
    status: likeResponse.likeStatus,
    message: likeResponse.message,
  });
};

async function httpsToggleLike(req, res) {
  const { trackId, isLike } = req.body;
  const { accessToken } = req.user;
  const { status, message, is_like } = await toggleLike({ trackId, isLike, accessToken })
  return res.status(status).json({
    message, 
    isLike: is_like
  })
};

export {
    httpsSearch,
    httpsSavePlaylist,
    httpsGetLikeStatus,
    httpsToggleLike
};