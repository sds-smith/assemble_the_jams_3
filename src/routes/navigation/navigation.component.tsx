import { useContext, FC } from "react"
import { useSelector } from "react-redux"

import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"

import { selectCurrentUserExists } from "../../store/user/user.selector"
import { ResponsiveContext } from "../../contexts/responsive.context"
import { useSignIn } from "../../utils/custom-hooks/use-sign-in"

import { NavigationContainer, Header, SpotifyAttributor, SpotifyLogo, SignInButtonContainer, SignInButton } from "./navigation.styles"
import { CurrentUserType } from "../../store/user/user.types"

type NavigationPropTypes = {
  authenticatedUser: CurrentUserType | null
}

const Navigation: FC<NavigationPropTypes> = ({authenticatedUser}) => {
    const { isMobile } = useContext(ResponsiveContext) 
    // const currentUserExists = useSelector(selectCurrentUserExists)
    const currentUserExists = Boolean(authenticatedUser);

    const {signIn, signOut} = useSignIn()

    const buttonText = currentUserExists ? 'SIGN OUT' : 'SIGN IN'

    const userAction = () => {
        if (currentUserExists) {
            signOut()
        } else {
            signIn()
        }
    }

    return (
        <NavigationContainer isMobile={isMobile}>
            <Header>
                <SpotifyAttributor isMobile={isMobile} href='https://www.spotify.com/us/premium/' target='_blank' rel="noreferrer" >
                  <SpotifyLogo src={SpotifyLogoWhite} id='spotify-logo' alt='Spotify Logo'/>
                  <p>Search powered by Spotify</p> 
                </SpotifyAttributor>        
                <h1><JamsLogo /></h1>
                <SignInButtonContainer userExists={currentUserExists} isMobile={isMobile} >
                  {!isMobile && 'For the best experience'}
                  <a href='/auth/spotify'>
                    <SignInButton isMobile={isMobile} onClick={userAction}>
                      {buttonText}
                    </SignInButton>
                  </a>
                  {!isMobile && 'with your Spotify Premium acct'}
                </SignInButtonContainer>
            </Header>  
        </NavigationContainer>
    )
}

export default Navigation