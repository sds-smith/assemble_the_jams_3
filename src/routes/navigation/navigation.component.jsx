import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png'
import { Header, SpotifyAttributor, SpotifyLogo } from "./navigation.styles"

const Navigation = () => {

    return (
        <Fragment>
            <Header>
                <SpotifyAttributor href='https://www.spotify.com/us/premium/' target='_blank' rel="noreferrer" >
                  <SpotifyLogo src={SpotifyLogoWhite} id='spotify-logo' alt='Spotify Logo'/>
                  <p>Works with Spotify Premium</p> 
                </SpotifyAttributor>        
                <h1>Assemble<span className="highlight">the</span>Jams</h1>
            </Header>  
            <Outlet />
        </Fragment>

    )
}


export default Navigation