import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setAuthSession, setAccessToken } from "../../store/auth/auth.action"
import { selectAuthSession } from "../../store/auth/auth.selector"

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authSession = useSelector(selectAuthSession)

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
              dispatch(setAccessToken(token))
              window.setTimeout(() => {
                dispatch(setAccessToken(''))
              }, expiresIn * 1000)
            }
          } catch(error) {
            console.log('nope ', error)
            window.alert('error with log-in, please contact app support.')
            navigate('/log-in')
          }
        }

        if (authCodeMatch) {
          if (!authSession) {
            const session = authCodeMatch[1].slice(0, 6)
            const authCode = authCodeMatch[1]
            dispatch(setAuthSession(session))
            getAccessToken(authCode)
          }
        } else {
          console.log('nope')
          navigate('/log-in')
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div></div>
    )
}

export default Auth