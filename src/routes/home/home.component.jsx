import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import HomeHero from "../../components/home-page-components/home-hero/home-hero.component"
// import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"
import Footer from "../../components/home-page-components/footer/footer.component"

import { useMediaQuery } from '../../utils/customHooks'
import { HomeContainer, InputContainer, ResultsContainer  } from "./home.styles"
import { selectAccessToken } from "../../store/auth/auth.selector"
import { setAuthSession, setAccessToken } from "../../store/auth/auth.action"

const Home = () => { 
    const [activeTab, setActiveTab] = useState({
      'playlist' : true,
      'search_results' : true,
      'recommendations' : true
    })
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 1020px)')

    useEffect(() => {
      if (!accessToken) {
          navigate('/log-in')
      }
      const setResponsiveTabs = () => {
        if (isMobile) {
          setActiveTab({...activeTab, 'playlist' : false, 'recommendations' : false})
        } else {
          setActiveTab({'playlist' : true, 'search_results' : true, 'recommendations' : true})
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
        <ResultsContainer isMobile={isMobile} >
          {activeTab.playlist && <Playlist />}
          { activeTab.search_results && <SearchResults />}
          { activeTab.recommendations && <Recommendations />}
        </ResultsContainer>
        {isMobile && <Footer activeTab={activeTab} setActiveTab={setActiveTab} />}
      </HomeContainer>
    )
}

export default Home