import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = ({ authSession, currentUser, profilePic, logo, displayName, SpotifyAuth }) => {

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
    }, [authSession])

    return (

        <div className="App">
          <header className="App-header">
            <div className='img-container'>
              <img src={currentUser ? profilePic : logo} className="App-logo" alt="logo" />
            </div>
            <h1>{currentUser ? displayName : 'Please Log In'}</h1>
            <a
              className="App-link" 
              href={SpotifyAuth} 
            > 
              Sign in with Spotify
            </a>
          </header>
        </div>


    )
}

export default Home