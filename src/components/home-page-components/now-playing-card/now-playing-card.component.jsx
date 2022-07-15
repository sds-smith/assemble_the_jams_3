import { useState, useEffect, useContext } from 'react'

import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import StopBtn from '../../../assets/icons/stop_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'
import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { UserContext } from '../../../contexts/user.context'
import { TrackContext } from '../../../contexts/track.context'
import { PlayerContext } from '../../../contexts/player.context'
import { Spotify } from '../../../utils/spotify'
import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, LikesMessage, ProgressContainer} from './now-playing-card.styles'

const NowPlayingCard = () => {
    const [transform, setTransform] = useState('scaleX(0)')
    const [likesMessage, setLikesMessage] = useState('')

    const { accessToken } = useContext(UserContext)
    const { playlistTracks, setPlaylistTracks } = useContext(TrackContext)
    const { deviceID, nowPlaying, setNowPlaying } = useContext(PlayerContext)

    const addTrack = () => {
        let tracks = playlistTracks
        if (tracks.find(savedTrack => savedTrack.id === nowPlaying.track.id)) {
          return
        }
        tracks.push(nowPlaying.track)
        setPlaylistTracks(tracks => [...tracks])
      }

    const toggleLike = () => {
        if (!nowPlaying.track.id) {
            return
          }
          if (nowPlaying.isLike) {
            Spotify.deleteLike(accessToken, nowPlaying.track.id)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: false}))
            setLikesMessage('Removed from Liked Songs')
            setTimeout(() => setLikesMessage(''), 3000);
          } else {
            Spotify.addLike(accessToken, nowPlaying.track.id)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: true}))
            setLikesMessage('Added to Liked Songs')
            setTimeout(() => setLikesMessage(''), 3000);
          }
    }

    const closeNowPlaying = () => {
        Spotify.stopPlayback(deviceID, accessToken)
        setTransform('scaleX(0)')
        setNowPlaying({hasTrack: false, track: {}, isLike: null})
    }

    const nowPlayingInterval = () => {
        setTransform('scaleX(1)')
        setTimeout(() => {
            closeNowPlaying()
        }, 30000)
    }

    useEffect(() => {
        nowPlayingInterval()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike

    return (
        <NowPlayingContainer >
            <SpotifyAttributor href={`https://open.spotify.com/track/${nowPlaying.track.id}?play`} target='_blank' rel="noreferrer">
                    <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                    <p>Listen on Spotify</p>
            </SpotifyAttributor>
            <NowPlayingCover  
                src={nowPlaying.track.cover} 
                 alt="now playing cover art" 
            />
            <NowPlayingLabel>
                <div >{nowPlaying.track.name}</div>
                <div >{nowPlaying.track.artist}</div>
            </NowPlayingLabel>
            <TrackControls>
                 <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                 <TrackActionButton onClick={toggleLike} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                 <TrackActionButton onClick={closeNowPlaying} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <LikesMessage>{likesMessage}</LikesMessage>
            <ProgressContainer transform={transform} />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard