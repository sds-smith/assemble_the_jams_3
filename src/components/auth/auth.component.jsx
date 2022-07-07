import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Spotify } from "../../utils/spotify"

const Auth = ({setAuthSession, setAccessToken}) => {

    const navigate = useNavigate()

    const createAuthDoc = async (session, authCode) => {
      try {
        const response = await fetch('/.netlify/functions/create-auth-doc', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({session, authCode})
        })
        const {accessToken, expiresIn} = await response.json()
        setAccessToken(accessToken)
        window.setTimeout(() => {
          setAccessToken('')
          Spotify.getAccessToken()
        }, expiresIn * 1000)
        navigate('/')
      } catch(error) {
        console.log(error)
      }
    }

    useEffect(() => {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/)
        if (authCodeMatch) {
            const session = authCodeMatch[1].slice(0, 6)
            const authCode = authCodeMatch[1]
            setAuthSession(session)
            createAuthDoc(session, authCode)
        }
    }, [])

    return (
        <div></div>
    )
}

export default Auth