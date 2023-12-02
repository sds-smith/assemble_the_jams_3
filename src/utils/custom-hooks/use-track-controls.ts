import { useContext } from "react";

import { AuthContext } from "../../contexts/auth.context";
import { TrackContext } from "../../contexts/track.context";
import { PlayerContext } from "../../contexts/player.context";

import { useLike } from "./apollo-hooks";
import { TrackType } from "../types/track.types";
import { nowPlayingInitialState } from "../types/player.types";

export const useTrackControls = (track: TrackType) => {
  const { currentUserExists } = useContext(AuthContext);
  const { recommendationsArray, searchResultsArray, setRecommendationsArray, setSearchResultsArray } = useContext(TrackContext);
  const { nowPlaying, setNowPlaying } = useContext(PlayerContext);

  const { likeStatus, toggleLike } = useLike();

  const addTrack = async () => {
    let tracks = recommendationsArray;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return `${track.name} already exists in Playlist`;
    };
    tracks.push(track);
    let searchTracks = searchResultsArray.filter(savedTrack => savedTrack.id !== track.id);
    setRecommendationsArray(tracks);
    setSearchResultsArray(searchTracks);
    return `${track.name} added to Playlist`;
  };

  const removeTrack = () => {
    let newTracks = recommendationsArray.filter(savedTrack => savedTrack.id !== track.id);
    setRecommendationsArray(newTracks);
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

  const handleToggleLike = async () => {
    if (!currentUserExists) {
        return 'Please sign in with Spotify to use this feature';
    };
    if (!nowPlaying.hasTrack()) {
        return 'Could not find track id';
    };
    const {message, is_like} = await toggleLike({
      trackId: nowPlaying.track.id,
      isLike: nowPlaying.isLike
    });
    setNowPlaying({...nowPlaying, isLike: is_like});
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
    handleToggleLike 
  };
};