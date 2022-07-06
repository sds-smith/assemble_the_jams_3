import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"

import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = ({ authSession, currentUser, searchResults, playlistTracks, recommendations, playlistName, setPlaylistName, setSearchResults, setRecommendations, onAdd, onRemove, onSave }) => {

    const [gradientAngle, setGradientAngle] = useState(135)

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
    }, [authSession])

    return (
      <HomeContainer gradientAngle={gradientAngle} >
        <HomeHero>
          <UserProfile currentUser={currentUser} />
          <SearchBar authSession={authSession} setSearchResults={setSearchResults} setRecommendations={setRecommendations} />
          <WebPlayer />
        </HomeHero>
        <ResultsContainer>
          <SearchResults tracks={searchResults} onAdd={onAdd} />
          <Playlist tracks={playlistTracks} playlistName={playlistName} setPlaylistName={setPlaylistName} onRemove={onRemove} onSave={onSave} />
          <Recommendations tracks={recommendations} onAdd={onAdd} />
        </ResultsContainer>
      </HomeContainer>
    )
}

export default Home