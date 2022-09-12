import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Spinner from '../../components/reusable-components/spinner/spinner.component'

import { setAccessToken } from "../../store/auth/auth.action"
import { selectAuthSession } from "../../store/auth/auth.selector"
import { useSignIn } from "../../utils/custom-hooks/use-sign-in"

import { AuthContainer } from "./auth.styles"

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            const {token, expiresIn} = await response.json()
            if (token) {
              dispatch(setAccessToken(token))
              window.setTimeout(() => {
                signOut()
              }, expiresIn * 1000)
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
          console.log('nope')
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