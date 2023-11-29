import { useContext } from "react";

import { AuthContext } from "../../contexts/auth.context";
import { TrackContext } from "../../contexts/track.context";
import { PlayerContext } from "../../contexts/player.context";

import { httpToggleLike } from "../http.requests";
import { likeStatus } from "../graphql/queries";
import { TrackType } from "../types/track.types";
import { nowPlayingInitialState } from "../types/player.types";

export const useTrackControls = (track: TrackType) => {
  const { currentUserExists } = useContext(AuthContext);
  const { playlistTracks, searchResults, setPlaylistTracks, setSearchResults } = useContext(TrackContext);
  const { nowPlaying, setNowPlaying } = useContext(PlayerContext);

  const addTrack = async () => {
    let tracks = playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return `${track.name} already exists in Playlist`;
    };
    tracks.push(track);
    let searchTracks = searchResults.filter(savedTrack => savedTrack.id !== track.id);
    setPlaylistTracks(tracks);
    setSearchResults(searchTracks);
    return `${track.name} added to Playlist`;
  };

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    setPlaylistTracks(newTracks);
    return 'track removed from playlist';
  };

  const playPreview = async () => {
    if (!track?.preview) {
      return 'Please sign in with Spotify to preview this track';
    };
    setNowPlaying({
      ...nowPlaying,
      track
    });
    return '';
  };

  const playTrack = async () => {
    const isLike = await likeStatus(track.id) 
    console.log({isLike})
    setNowPlaying({
      ...nowPlaying,
      track,
      isLike
    });
    return '';
  };

  const play = async () => {
    let message: string;
    if (currentUserExists) {
      message = await playTrack();
    } else {
      message = await playPreview();
    };
    return message;
  };

  const toggleLike = async () => {
    if (!currentUserExists) {
        return 'Please sign in with Spotify to use this feature';
    };
    if (!nowPlaying.hasTrack()) {
        return 'Could not find track id';
    };
    const {message, isLike} = await httpToggleLike(nowPlaying);
    setNowPlaying({...nowPlaying, isLike});
    return `${message} - ${track.name}`;
  };

  const stopPlayback = async () => {
    setNowPlaying(nowPlayingInitialState);
  };

  return { 
    play, 
    stopPlayback, 
    addTrack, 
    removeTrack, 
    toggleLike 
  };
};