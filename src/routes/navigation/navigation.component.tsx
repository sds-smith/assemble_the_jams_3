import { useContext } from "react";

import SpotifyLogoWhite from '../../assets/icons/Spotify_Logo_RGB_White.png';
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component";

import { ResponsiveContext } from "../../contexts/responsive.context";
import { AuthContext } from "../../contexts/auth.context";
import { httpSignOutUser } from "../../utils/http.requests/auth";

import { NavigationContainer, Header, SpotifyAttributor, SpotifyLogo, SignInButtonContainer, SignInButton } from "./navigation.styles";

const Navigation = () => {
    const { isMobile } = useContext(ResponsiveContext);
    const { currentUserExists } = useContext(AuthContext);

    const buttonText = currentUserExists ? 'SIGN OUT' : 'SIGN IN';
    const buttonHref = currentUserExists ? '' : '/auth/spotify/authenticate-user';

    const userAction = () => {
      if (currentUserExists) {
        httpSignOutUser();
      };
    };

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
                  <a href={buttonHref}>
                    <SignInButton isMobile={isMobile} onClick={userAction} >
                      {buttonText}
                    </SignInButton>
                  </a>
                  {!isMobile && 'with your Spotify Premium acct'}
                </SignInButtonContainer>
            </Header>  
        </NavigationContainer>
    );
};

export default Navigation;