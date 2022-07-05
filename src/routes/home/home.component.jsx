import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProfilePic from '../../assets/icons/default_profile96.png'

const Home = ({ authSession, currentUser }) => {

    const [profilePic, setProfilePic] = useState(ProfilePic)
    const [displayName, setDisplayName] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
      if (!authSession) {
          navigate('/log-in')
      }
    }, [authSession])

    useEffect(() => {
      if (currentUser) {
        setProfilePic(currentUser.images[0].url)
        setDisplayName(currentUser.display_name)
      }
    })

    return (

        <div className="App">
          <header className="App-header">
            <div className='img-container'>
              <img src={profilePic} className="App-logo" alt="logo" />
            </div>
            <h1>{currentUser ? displayName : 'Please Log In'}</h1>
          </header>
        </div>


    )
}

export default Home