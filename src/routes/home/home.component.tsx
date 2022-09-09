import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import HomeHero from "../../components/home-page-components/home-hero/home-hero.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"
import Footer from "../../components/home-page-components/footer/footer.component"

import { useMediaQuery } from '../../utils/custom-hooks/use-media-query'
import { HomeContainer, InputContainer, ResultsContainer  } from "./home.styles"
import { selectAccessToken } from "../../store/auth/auth.selector"

const Home = () => { 
    const [activeTab, setActiveTab] = useState({
      'playlist' : true,
      'search_results' : true
    })
    const accessToken = useSelector(selectAccessToken)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    useEffect(() => {
      const setResponsiveTabs = () => {
        if (isMobile) {
          setActiveTab({...activeTab, 'search_results' : false})
        } else {
          setActiveTab({'playlist' : true, 'search_results' : true})
        }
      }
      setResponsiveTabs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, isMobile])

    return (
      <HomeContainer >
        <InputContainer isMobile={isMobile} >
          <UserProfile />
          <HomeHero />
          <WebPlayer /> 
        </InputContainer>
        <ResultsContainer id='results' isMobile={isMobile} >
          {activeTab.playlist && <Playlist />}
          { activeTab.search_results && <SearchResults />}
        </ResultsContainer>
        {isMobile && <Footer activeTab={activeTab} setActiveTab={setActiveTab} />}
      </HomeContainer>
    )
}

export default Home