import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"
import Button from "../../components/reusable-components/button/button.component"
import { useMediaQuery } from '../../utils/customHooks'
import { Header, SpotifyAttributor, SpotifyLogo } from "./navigation.styles"

import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { useDispatch } from "react-redux"

const Navigation = () => {
    const dispatch = useDispatch()
    const isMobile = useMediaQuery('(max-width: 1020px)')

    const logout = () => {
        dispatch(setAuthSession(''))
        dispatch(setAccessToken(''))
    }

    return (
        <Fragment>
            <Header>
                <SpotifyAttributor isMobile={isMobile} href='https://www.spotify.com/us/premium/' target='_blank' rel="noreferrer" >
                  <SpotifyLogo src={SpotifyLogoWhite} id='spotify-logo' alt='Spotify Logo'/>
                  <p>Works with Spotify Premium</p> 
                </SpotifyAttributor>        
                <h1><JamsLogo /></h1>
                <Button onClick={logout} >SIGN OUT</Button>
            </Header>  
            <Outlet />
        </Fragment>
    )
}

export default Navigation