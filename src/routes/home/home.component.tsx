import { useState, useEffect, useContext } from "react"

import HomeHero from "../../components/home-page-components/home-hero/home-hero.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"
import Footer from "../../components/home-page-components/footer/footer.component"

import { PlayerContext } from "../../contexts/player.context"
import { ResponsiveContext } from "../../contexts/responsive.context"
import { HomeContainer, InputContainer, ResultsContainer  } from "./home.styles"

const Home = () => { 
    const [activeTab, setActiveTab] = useState({
      'playlist' : true,
      'search_results' : true
    })
    const { isMobile } = useContext(ResponsiveContext) 
    const { activePlayer } = useContext(PlayerContext)

    useEffect(() => {
      const setResponsiveTabs = () => {
        if (isMobile) {
          setActiveTab({'playlist' : true, 'search_results' : false})
        } else {
          setActiveTab({'playlist' : true, 'search_results' : true})
        }
      }
      setResponsiveTabs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    return (
      <HomeContainer isMobile activePlayer={activePlayer} >
        <InputContainer isMobile={isMobile} >
           <UserProfile />
           <HomeHero />
           <WebPlayer /> 
        </InputContainer>
        <ResultsContainer isMobile={isMobile} >
           {activeTab.playlist && <Playlist />}
           { activeTab.search_results && <SearchResults />}
        </ResultsContainer>
        {isMobile && <Footer activeTab={activeTab} setActiveTab={setActiveTab} />}
      </HomeContainer>
    )
}

export default Home