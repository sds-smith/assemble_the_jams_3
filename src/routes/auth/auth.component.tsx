import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Spinner from '../../components/reusable-components/spinner/spinner.component'
import ActionMessage from "../../components/reusable-components/action-message/action-message.component"

import { setAccessToken, setRefreshToken, setExpiresAt } from "../../store/auth/auth.action"
import { selectAuthSession } from "../../store/auth/auth.selector"
import { useSignIn } from "../../utils/custom-hooks/use-sign-in"

import { AuthContainer } from "./auth.styles"

const Auth = () => {
    const [declinedMessage, setDeclinedMessage] = useState('')
    const dispatch = useDispatch()

    const authSession = useSelector(selectAuthSession)
    const { signOut } = useSignIn()

    useEffect(() => {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/)

        const getAccessToken = async ( authCode: string ): Promise<void> => {
          try {
            const response = await fetch('/.netlify/functions/get-user-access-token', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ authCode, authSession })
            })
            const { access_token, expires_in, refresh_token, expires_at} = await response.json()
            if (access_token) {
              dispatch(setAccessToken(access_token))
              dispatch(setRefreshToken(refresh_token))
              dispatch(setExpiresAt(expires_at))

              window.setTimeout(() => {
                signOut()
              }, expires_in * 1000)
            }
          } catch(error) {
            console.log('error getting access token ', error)
          }
        }

        if (authCodeMatch) {
            const authCode: string = authCodeMatch[1]
            getAccessToken(authCode)
        } else {
          console.log('user declined sign-in')
          setDeclinedMessage('User Declined Sign-in')
          window.setTimeout(() => {
            setDeclinedMessage('')
            signOut()
          }, 2000)
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContainer>
          <ActionMessage >{declinedMessage}</ActionMessage>
          <Spinner loading />
        </AuthContainer>
    )
}

export default Auth