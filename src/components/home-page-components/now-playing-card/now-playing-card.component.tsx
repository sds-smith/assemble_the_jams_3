import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'
import ActionMessage from '../../reusable-components/action-message/action-message.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import StopBtn from '../../../assets/icons/stop_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'
import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { selectAuthSession } from '../../../store/auth/auth.selector'
import { selectPlaylistTracks } from '../../../store/track/track.selector'
import { setPlaylistTracks } from '../../../store/track/track.action'
import { UserContext } from '../../../contexts/user.context'
import { PlayerContext } from '../../../contexts/player.context'
import { useMediaQuery } from '../../../utils/custom-hooks/use-media-query'
import { Spotify } from '../../../utils/spotify'
import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, ProgressContainer} from './now-playing-card.styles'

const NowPlayingCard = () => {
    const [likesMessage, setLikesMessage] = useState('')

    const dispatch = useDispatch()

    const authSession = useSelector(selectAuthSession)
    const playlistTracks = useSelector(selectPlaylistTracks)

    const { currentUserExists } = useContext(UserContext)
    const { currentPlayer, nowPlaying, setNowPlaying, active, setActive, nowPlayingInitialState } = useContext(PlayerContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    const addTrack = () => {
        let tracks = playlistTracks
        if (tracks.find(savedTrack => savedTrack.id === nowPlaying.track.id)) {
          return
        }
        tracks.push(nowPlaying.track)
        dispatch(setPlaylistTracks(tracks))
    }

    const toggleLike = async () => {
        if (!currentUserExists()) {
            window.alert('Please sign in with Spotify to use this feature')
            return
        }
        if (!nowPlaying.track.id) {
            return
        }
        const {message, isLike} = await Spotify.toggleLike(authSession, nowPlaying)
        setNowPlaying({...nowPlaying, isLike})
        setLikesMessage(message)
        setTimeout(() => setLikesMessage(''), 3000);
    }

    const closeNowPlaying = async () => {
        if (currentPlayer) {
            await currentPlayer.pause()
            setNowPlaying(nowPlayingInitialState)
        } else {
            setActive(false)
            setNowPlaying(nowPlayingInitialState)
        }
    }

    const stopPlayback = () => {
        if (currentPlayer) {
            closeNowPlaying()
        } else {
            window.alert('This feature only available with signed in user')
        }
    }

    useEffect(() => {
        !currentPlayer && setActive(true)
        const timer = setTimeout(() => closeNowPlaying(), 30000)
        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike
    const nowPlayingCover = nowPlaying.track.cover ? nowPlaying.track.cover : ''

    return (
        <NowPlayingContainer isMobile={isMobile} >
            <SpotifyAttributor href={`https://open.spotify.com/track/${nowPlaying.track.id}?play`} target='_blank' rel="noreferrer">
                    <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                    <p>Listen on Spotify</p>
            </SpotifyAttributor>
            <NowPlayingCover  
                src={nowPlayingCover} 
                 alt="now playing cover art" 
            />
            <NowPlayingLabel>
                <div >{nowPlaying.track.name}</div>
                <div >{nowPlaying.track.artist}</div>
            </NowPlayingLabel>
            <TrackControls>
                 <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                 <TrackActionButton onClick={toggleLike} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                 <TrackActionButton onClick={stopPlayback} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <ActionMessage bottom='2.2rem' right='10px'>{likesMessage}</ActionMessage>
            <ProgressContainer 
                transition={ active ? 'transform 30s linear' : 'transform 0s linear' } 
                transform={ active ? 'scaleX(1)' : 'scaleX(0)' }
                backgroundColor='rgba(0, 0, 0, .1)'
            />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard