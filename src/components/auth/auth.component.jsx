import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../../contexts/user.context"

const Auth = () => {

    const {setAuthSession, setAccessToken, accessToken} = useContext(UserContext)

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
            const {token, expiresIn} = await response.json()
            if (token) {
              setAccessToken(token)
              window.setTimeout(() => {
                setAccessToken('')
              }, expiresIn * 1000)
            }

            navigate('/')
          } catch(error) {
            console.log(error)
          }
        }

        if (authCodeMatch) {
          if (!accessToken) {
            const session = authCodeMatch[1].slice(0, 6)
            const authCode = authCodeMatch[1]
            setAuthSession(session)
            getAccessToken(authCode)
          }
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div></div>
    )
}

export default Auth