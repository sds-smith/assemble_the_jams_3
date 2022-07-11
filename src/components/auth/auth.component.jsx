import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Auth = ({setAuthSession, setAccessToken}) => {

    const navigate = useNavigate()

    useEffect(() => {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/)

        const getAccessToken = async ( authCode ) => {
          try {
            const response = await fetch('/.netlify/functions/get-access-token', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ authCode })
            })
            const {accessToken, expiresIn} = await response.json()
            setAccessToken(accessToken)
            window.setTimeout(() => {
              setAccessToken('')
            }, expiresIn * 1000)
            navigate('/')
          } catch(error) {
            console.log(error)
          }
        }

        if (authCodeMatch) {
            const session = authCodeMatch[1].slice(0, 6)
            const authCode = authCodeMatch[1]
            setAuthSession(session)
            getAccessToken( authCode)
        }
    }, [navigate, setAccessToken, setAuthSession])

    return (
        <div></div>
    )
}

export default Auth