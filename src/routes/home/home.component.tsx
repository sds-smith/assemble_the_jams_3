import { useEffect, useContext } from "react"
import { useSelector } from "react-redux"

import HomeHero from "../../components/home-page-components/home-hero/home-hero.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"
import Footer from "../../components/home-page-components/footer/footer.component"
import NowPlayingCard from "../../components/home-page-components/web-player/now-playing-card/now-playing-card.component"

import { selectActivePlayer, selectNowPlaying } from "../../store/player/player.selector"
import { ResponsiveContext } from "../../contexts/responsive.context"
import { HomeContainer, InputContainer, ResultsContainer  } from "./home.styles"

const Home = () => { 

    const { isMobile, activeTab, activeView, setDesktop, setMobileHome } = useContext(ResponsiveContext) 
    const activePlayer = useSelector(selectActivePlayer)
    const nowPlaying = useSelector(selectNowPlaying)

    useEffect(() => {
      const setResponsiveTabs = () => {
        if (isMobile) {
          setMobileHome()
        } else {
          setDesktop()
        }
      }
      setResponsiveTabs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    return (
      <HomeContainer isMobile activePlayer={activePlayer} >
        { activeView.input &&
          <InputContainer isMobile={isMobile} >
             <UserProfile />
             <HomeHero />
             <WebPlayer />
          </InputContainer>
        }
        { activeView.results &&
          <ResultsContainer isMobile={isMobile} >
           {activeTab.playlist && <Playlist />}
           { activeTab.search_results && <SearchResults />}
           { !activeView.input && nowPlaying.hasTrack && <NowPlayingCard/> }
          </ResultsContainer>
        }
        {isMobile && <Footer />}
      </HomeContainer>
    )
}

export default Home