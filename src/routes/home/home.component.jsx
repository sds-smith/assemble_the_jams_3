import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"

import { UserContext } from "../../contexts/user.context"
import { useMediaQuery } from '../../utils/customHooks'
import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = () => { 
    const { authSession } = useContext(UserContext)
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 1020px)')
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authSession])

    return (
      <HomeContainer >
        <HomeHero isMobile={isMobile} >
          <UserProfile />
          <SearchBar />
          <WebPlayer />
        </HomeHero>
        <ResultsContainer isMobile={isMobile} >
          <SearchResults />
          <Playlist />
          <Recommendations />
        </ResultsContainer>
      </HomeContainer>
    )
}

export default Home