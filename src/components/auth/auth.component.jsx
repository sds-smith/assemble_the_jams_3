import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Auth = ({setAuthSession, setHasAccessToken}) => {

    const navigate = useNavigate()

    const createAuthDoc = async (session, authCode) => {
      try {
        console.log({authCode})
        const response = await fetch('/.netlify/functions/create-auth-doc', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({session, authCode})
        })
        const {hasToken} = await response.json()
        setHasAccessToken(hasToken)
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
            console.log({authCode})
            setAuthSession(session)
            createAuthDoc(session, authCode)
        }
    }, [])

    return (
        <div></div>
    )
}

export default Auth