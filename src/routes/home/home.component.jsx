import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"

import { UserContext } from "../../contexts/user.context"
import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = ({ searchResults, playlistTracks, recommendations, playlistName, setPlaylistName, setSearchResults, setRecommendations, searchLoading, setSearchLoading, onAdd, onRemove, onPlay, onSave  }) => {
 
    const { authSession } = useContext(UserContext)

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authSession])

    return (
      <HomeContainer style={{backgroundImage: `linear-gradient(135deg, green, black)`}} >
        <HomeHero>
          <UserProfile />
          <SearchBar setSearchResults={setSearchResults} setRecommendations={setRecommendations} setSearchLoading={setSearchLoading} />
          <WebPlayer onAdd={onAdd} />
        </HomeHero>
        <ResultsContainer>
          <SearchResults tracks={searchResults} onAdd={onAdd} onPlay={onPlay} searchLoading={searchLoading} />
          <Playlist tracks={playlistTracks} playlistName={playlistName} setPlaylistName={setPlaylistName} onRemove={onRemove} onSave={onSave}  />
          <Recommendations tracks={recommendations} onAdd={onAdd} onPlay={onPlay} searchLoading={searchLoading} />
        </ResultsContainer>
      </HomeContainer>
    )
}

export default Home