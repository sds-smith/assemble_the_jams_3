import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"
import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"
import { useMediaQuery } from '../../utils/customHooks'
import { Header, SpotifyAttributor, SpotifyLogo, SignInButton } from "./navigation.styles"

import { generateRandomString } from '../../utils/random-state-generator';
import { Spotify } from "../../utils/spotify"

import { UserContext } from "../../contexts/user.context"
import { PlayerContext } from "../../contexts/player.context"
import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { useDispatch } from "react-redux"
import { setPlaylistTracks, setPlaylistName, setSearchResults } from "../../store/track/track.action"

const Navigation = () => {
    const dispatch = useDispatch()
    const isMobile = useMediaQuery('(max-width: 1020px)')
    const { currentUser } = useContext(UserContext)
    const { setCurrentPlayer } = useContext(PlayerContext)

    const buttonText = currentUser ? 'SIGN OUT' : 'SIGN IN'

    const signIn = async () => {
        const session = generateRandomString()
        dispatch(setAuthSession(session))
        try {
            const response = await fetch('/.netlify/functions/create-auth-doc', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ session })
            })
            const { codeChallenge, state} = await response.json()
            Spotify.auth(codeChallenge, state)
        } catch (error) {
          console.log(error)
        } 
    }

    const signOut = () => {
        dispatch(setAuthSession(''))
        dispatch(setAccessToken(''))
        dispatch(setPlaylistName('Name Your New Playlist'))
        dispatch(setPlaylistTracks([]))
        dispatch(setSearchResults([]))
        setCurrentPlayer(undefined)
    }

    const userAction = () => {
        if (currentUser) {
            signOut()
        } else {
            signIn()
        }
    }

    return (
        <Fragment>
            <Header>
                <SpotifyAttributor isMobile={isMobile} href='https://www.spotify.com/us/premium/' target='_blank' rel="noreferrer" >
                  <SpotifyLogo src={SpotifyLogoWhite} id='spotify-logo' alt='Spotify Logo'/>
                  <p>Works with Spotify Premium</p> 
                </SpotifyAttributor>        
                <h1><JamsLogo /></h1>
                <SignInButton onClick={userAction} isMobile={isMobile} >{buttonText}</SignInButton>
            </Header>  
            <Outlet />
        </Fragment>
    )
}

export default Navigation