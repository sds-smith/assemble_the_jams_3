import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../../components/home-page-components/search-bar/search-bar.component"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import WebPlayer from "../../components/home-page-components/web-player/web-player.component"
import SearchResults from "../../components/home-page-components/search-results/search-results.component"
import Recommendations from "../../components/home-page-components/recommendations/recommendations.component"
import Playlist from "../../components/home-page-components/playlist/playlist.component"

import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = ({ authSession, currentUser, tracks, playlistTracks, playlistName }) => {

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
    }, [authSession])

    return (
      <HomeContainer gradientAngle='45' >
        <HomeHero>
          <UserProfile currentUser={currentUser} />
          <SearchBar />
          <WebPlayer />
        </HomeHero>
        <ResultsContainer>
          <SearchResults tracks={tracks} />
          <Playlist playlistTracks={playlistTracks} playlistName={playlistName} />
          <Recommendations tracks={tracks} />
        </ResultsContainer>
      </HomeContainer>
    )
}

export default Home