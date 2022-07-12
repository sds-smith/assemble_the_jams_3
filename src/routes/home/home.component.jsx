import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"

import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = ({ accessToken, authSession, currentUser, searchResults, playlistTracks, recommendations, playlistName, setPlaylistName, setSearchResults, setRecommendations, searchLoading, setSearchLoading, onAdd, onRemove, onPlay, onSave, gradientAngle, setGradientAngle, deviceID, setDeviceId, player, setPlayer, nowPlaying, setNowPlaying }) => {

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
    }, [authSession, navigate])

    return (
      <HomeContainer style={{backgroundImage: `linear-gradient(${gradientAngle}deg, green, black)`}} >
        <HomeHero>
          <UserProfile currentUser={currentUser} />
          <SearchBar accessToken={accessToken} setSearchResults={setSearchResults} setRecommendations={setRecommendations} setSearchLoading={setSearchLoading} />
          <WebPlayer accessToken={accessToken} authSession={authSession} gradientAngle={gradientAngle} setGradientAngle={setGradientAngle}                       deviceID={deviceID}
                      setDeviceId={setDeviceId}
                      player={player}
                      setPlayer={setPlayer}
                      nowPlaying={nowPlaying}
                      setNowPlaying={setNowPlaying}
                      onAdd={onAdd}
                     />
        </HomeHero>
        <ResultsContainer>
          <SearchResults tracks={searchResults} onAdd={onAdd} onPlay={onPlay} searchLoading={searchLoading} />
          <Playlist tracks={playlistTracks} playlistName={playlistName} setPlaylistName={setPlaylistName} onRemove={onRemove} onSave={onSave} />
          <Recommendations tracks={recommendations} onAdd={onAdd} onPlay={onPlay} searchLoading={searchLoading} />
        </ResultsContainer>
      </HomeContainer>
    )
}

export default Home