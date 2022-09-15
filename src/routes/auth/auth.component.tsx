import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Spinner from '../../components/reusable-components/spinner/spinner.component'

import { setAccessToken } from "../../store/auth/auth.action"
import { selectAuthSession } from "../../store/auth/auth.selector"
import { useSignIn } from "../../utils/custom-hooks/use-sign-in"

import { AuthContainer } from "./auth.styles"

const Auth = () => {
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
            console.log({ access_token, expires_in, refresh_token, expires_at})
            if (access_token) {
              dispatch(setAccessToken(access_token))
              window.setTimeout(() => {
                signOut()
              }, expires_in * 1000)
            }
          } catch(error) {
            console.log('nope ', error)
            window.alert('error with log-in, please contact app support.')
          }
        }

        if (authCodeMatch) {
            const authCode: string = authCodeMatch[1]
            getAccessToken(authCode)
        } else {
          console.log('user declined sign-in')
          window.alert('user declined sign-in')
          signOut()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContainer>
          <Spinner loading />
        </AuthContainer>
    )
}

export default Auth