import { Fragment, useContext, FC } from "react"
import { Outlet } from "react-router-dom"

import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"
import { ResponsiveContext } from "../../contexts/responsive.context"
import { useSignIn } from "../../utils/custom-hooks/use-sign-in"
import { UserContext } from "../../contexts/user.context"

import { Header, SpotifyAttributor, SpotifyLogo, SignInButtonContainer, SignInButton } from "./navigation.styles"


const Navigation: FC = () => {
    const {isMobile} = useContext(ResponsiveContext)
    const { currentUserExists } = useContext(UserContext)

    const {signIn, signOut} = useSignIn()

    const userExists = currentUserExists()

    const buttonText = userExists ? 'SIGN OUT' : 'SIGN IN'

    const userAction = () => {
        if (userExists) {
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
                  <p>Search powered by Spotify</p> 
                </SpotifyAttributor>        
                <h1><JamsLogo /></h1>
                <SignInButtonContainer userExists={userExists} isMobile={isMobile} >
                  {!isMobile && 'For the best experience'}
                  <SignInButton isMobile={isMobile} onClick={userAction}>
                    {buttonText}
                  </SignInButton>
                  {!isMobile && 'with your Spotify Premium acct'}
                </SignInButtonContainer>
            </Header>  
            <Outlet />
        </Fragment>
    )
}

export default Navigation