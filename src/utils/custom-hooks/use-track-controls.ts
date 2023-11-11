import { useContext } from "react";

import { AuthContext } from "../../contexts/auth.context";
import { TrackContext } from "../../contexts/track.context";
import { PlayerContext } from "../../contexts/player.context";

import { Spotify } from "../spotify"
import { TrackType } from "../../store/track/track.types"
import { nowPlayingInitialState } from "../../store/player/player.types";

export const useTrackControls = (track: TrackType) => {
  const { currentUserExists } = useContext(AuthContext);
  const { playlistTracks, searchResults, setPlaylistTracks, setSearchResults } = useContext(TrackContext);
  const { nowPlaying, deviceId, currentPlayer, setNowPlaying } = useContext(PlayerContext);

  // To Do: deal with this later //
  const authSession = '';
  const accessToken = '';
  //////// these are not in the frontend ///////////

  const addTrack = async () => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return `${track.name} already exists in Playlist`
    }
    tracks.push(track)
    let searchTracks = searchResults.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks(tracks)
    setSearchResults(searchTracks)
    return `${track.name} added to Playlist`
  }

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks(newTracks)
    return 'track removed from playlist'
  }

  const playPreview = async () => {
    if (!track.preview) {
      return 'Please sign in with Spotify to preview this track';
    }
    if (!nowPlaying.hasTrack) {
      const hasTrack = true
      const isLike = false
      setNowPlaying({hasTrack, track, isLike})
    }  
    return ''
  };

  const playTrack = async () => {
    if (currentPlayer) {
      if (track.id) {
        if (!nowPlaying.hasTrack) {
          const hasTrack = true
          const isLike = await Spotify.getLikeStatus(authSession, track.id)
          const uri = `spotify:track:${track.id}`
          console.log('setting nowPlaying')
          console.log({hasTrack, track, isLike})
          setNowPlaying({hasTrack, track, isLike})
          Spotify.playTrack(deviceId, uri, currentPlayer) 
          }
        }
    }
    return ''
  }

  const play = async () => {
    let message: string;
    if (currentPlayer) {
      await currentPlayer.activateElement()
      message = await playTrack()
    } else {
      message = await playPreview()
    }
    return message
  }

  const toggleLike = async () => {
    if (!currentUserExists) {
        return 'Please sign in with Spotify to use this feature'
    }
    if (!nowPlaying.track.id) {
        return 'Could not find track id'
    }
    const {message, isLike} = await Spotify.toggleLike(authSession, nowPlaying)
    setNowPlaying({...nowPlaying, isLike})
    return `${message} - ${track.name}`
}

  const stopPlayback = async () => {
    if (currentPlayer) {
        console.log('currentPlayer.pause(), Spotify.stopPlayback')
        await currentPlayer.pause()
        await Spotify.stopPlayback(deviceId, accessToken)
    }
    setNowPlaying(nowPlayingInitialState)
}

    return { play, stopPlayback, addTrack, removeTrack, toggleLike }
}