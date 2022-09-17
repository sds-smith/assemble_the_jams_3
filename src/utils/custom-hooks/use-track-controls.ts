import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectAuthSession } from "../../store/auth/auth.selector"
import { selectAccessToken } from "../../store/auth/auth.selector"
import { selectPlaylistTracks } from "../../store/track/track.selector"
import { selectSearchResults } from "../../store/track/track.selector"
import { setPlaylistTracks } from "../../store/track/track.action"
import { setSearchResults } from "../../store/track/track.action"
import { PlayerContext } from "../../contexts/player.context"
import { UserContext } from "../../contexts/user.context"

import { Spotify } from "../spotify"
import { TrackType } from "../../store/track/track.types"

export const useTrackControls = (track: TrackType) => {

  const dispatch = useDispatch()

  const authSession = useSelector(selectAuthSession)
  const accessToken = useSelector(selectAccessToken)
  const playlistTracks = useSelector(selectPlaylistTracks)
  const searchResults = useSelector(selectSearchResults)
  const { nowPlaying, setNowPlaying, deviceID, currentPlayer, nowPlayingInitialState } = useContext(PlayerContext)
  const { currentUserExists } = useContext(UserContext)

  const addTrack = async () => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return `${track.name} already exists in Playlist`
    }
    tracks.push(track)
    let searchTracks = searchResults.filter(savedTrack => savedTrack.id !== track.id)
    dispatch(setPlaylistTracks(tracks))
    dispatch(setSearchResults(searchTracks))
    return `${track.name} added to Playlist`
  }

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    dispatch(setPlaylistTracks(newTracks))
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
          await Spotify.playTrack(deviceID, uri, currentPlayer) 
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
    if (!currentUserExists()) {
        return 'Please sign in with Spotify to use this feature'
    }
    if (!nowPlaying.track.id) {
        return 'Could not find track id'
    }
    const {message, isLike} = await Spotify.toggleLike(authSession, nowPlaying)
    console.log('setting nowPlaying')
    console.log({...nowPlaying, isLike})
    setNowPlaying({...nowPlaying, isLike})
    return message
}

  const stopPlayback = async () => {
    if (currentPlayer) {
        await currentPlayer.pause()
        await Spotify.stopPlayback(deviceID, accessToken)
    }
    console.log('setting nowPlaying')
    console.log(nowPlayingInitialState)
    setNowPlaying(nowPlayingInitialState)
}

    return { play, stopPlayback, addTrack, removeTrack, toggleLike }
}