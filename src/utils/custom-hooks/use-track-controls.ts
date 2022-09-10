import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectAuthSession } from "../../store/auth/auth.selector"
import { selectPlaylistTracks } from "../../store/track/track.selector"
import { setPlaylistTracks } from "../../store/track/track.action"
import { PlayerContext } from "../../contexts/player.context"
import { UserContext } from "../../contexts/user.context"

import { Spotify } from "../spotify"
import { TrackType } from "../../store/track/track.types"

export const useTrackControls = (track: TrackType) => {

  const dispatch = useDispatch()

  const authSession = useSelector(selectAuthSession)
  const playlistTracks = useSelector(selectPlaylistTracks)
  const { nowPlaying, setNowPlaying, deviceID, currentPlayer, active, setActive, nowPlayingInitialState } = useContext(PlayerContext)
  const { currentUserExists } = useContext(UserContext)

  const addTrack = () => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    dispatch(setPlaylistTracks(tracks))
  }

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    dispatch(setPlaylistTracks(newTracks))
  }

  const playPreview = async () => {
    if (!track.preview) {
      window.alert('Please sign in with Spotify to preview this track')
      return;
    }
    if (!nowPlaying.hasTrack) {
      const hasTrack = true
      const isLike = false
      setNowPlaying({hasTrack, track, isLike})
    }  
  };

  const playTrack = async () => {
    if (track.id) {
      if (!nowPlaying.hasTrack) {
        const hasTrack = true
        const isLike = await Spotify.getLikeStatus(authSession, track.id)
        const uri = `spotify:track:${track.id}`
        setNowPlaying({hasTrack, track, isLike})
        if (currentPlayer) {
          Spotify.playTrack(deviceID, uri, currentPlayer) 
        }
      }
    }
  }

  const play = async () => {
    if (currentPlayer) {
      await currentPlayer.activateElement()
      playTrack()
    } else {
      playPreview()
    }
  }

  const toggleLike = async () => {
    if (!currentUserExists()) {
        window.alert('Please sign in with Spotify to use this feature')
        return ''
    }
    if (!nowPlaying.track.id) {
        return ''
    }
    const {message, isLike} = await Spotify.toggleLike(authSession, nowPlaying)
    setNowPlaying({...nowPlaying, isLike})
    return message
}


  const closeNowPlaying = async () => {
    if (currentPlayer) {
        await currentPlayer.pause()
    } else {
        setActive(false)
    }
    setNowPlaying(nowPlayingInitialState)
}

const stopPlayback = () => {
  if (currentPlayer) {
      closeNowPlaying()
  } else {
      window.alert('This feature only available with signed in user')
  }
}

    return { play, closeNowPlaying, stopPlayback, addTrack, removeTrack, toggleLike }
}