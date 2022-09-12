import { useEffect, useContext } from "react"
import { useSelector } from "react-redux"

import HomeHero from "../../components/home-page-components/home-hero/home-hero.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"
import Footer from "../../components/home-page-components/footer/footer.component"

import { ResponsiveContext } from "../../contexts/responsive.context"
import { PlayerContext } from "../../contexts/player.context"
import { selectAccessToken } from "../../store/auth/auth.selector"
import { Spotify } from "../../utils/spotify"
import { HomeContainer, InputContainer, ResultsContainer  } from "./home.styles"

const Home = () => { 
    const { activeTab, activeView,  } = useContext(ResponsiveContext)
    const {isMobile, setMobileHome, setDesktop} = useContext(ResponsiveContext)
    const { deviceID } = useContext(PlayerContext)
    const accessToken = useSelector(selectAccessToken)

    useEffect(() => {
      const setResponsive = () => {
        isMobile ? setMobileHome() : setDesktop()
      }
      setResponsive()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    useEffect(() => {
      if (deviceID) {
        const transfer = async () => {
          await Spotify.transferPlayback(deviceID, accessToken)
        }
        transfer()
      }
    }, [deviceID, accessToken])

    return (
      <HomeContainer isMobile={isMobile} >
        {activeView.input && 
          <InputContainer isMobile={isMobile} >
             <UserProfile />
             <HomeHero />
             <WebPlayer /> 
          </InputContainer>}
        {activeView.results && 
          <ResultsContainer isMobile={isMobile} >
             {activeTab.playlist && <Playlist />}
             { activeTab.search_results && <SearchResults />}
          </ResultsContainer>}
        {isMobile && <Footer />}
      </HomeContainer>
    )
}

export default Home