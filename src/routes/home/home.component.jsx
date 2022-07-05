import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserProfile from "../../components/home-page-components/user-profile/user-profile.component"
import { HomeContainer, HomeHero, ResultsContainer } from "./home.styles"

const Home = ({ authSession, currentUser }) => {



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
        </HomeHero>
        <ResultsContainer>I am the Results Container</ResultsContainer>
      </HomeContainer>
    )
}

export default Home