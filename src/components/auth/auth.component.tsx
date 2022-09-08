import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import Spinner from '../reusable-components/spinner/spinner.component'

import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { setPlaylistTracks, setPlaylistName, setSearchResults } from "../../store/track/track.action"
import { selectAuthSession } from "../../store/auth/auth.selector"
import { PlayerContext } from "../../contexts/player.context"

import { AuthContainer } from "./auth.styles"

const Auth = () => {
    const dispatch = useDispatch()

    const authSession = useSelector(selectAuthSession)
    const { setCurrentPlayer } = useContext(PlayerContext)

    useEffect(() => {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/)

        const signOut = async () => {
          try {
              await fetch('/.netlify/functions/delete-auth-doc', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authSession })
              })
          } catch(error) {
              console.log(error)
          }
          dispatch(setAuthSession(''))
          dispatch(setAccessToken(''))
          dispatch(setPlaylistName('Name Your New Playlist'))
          dispatch(setPlaylistTracks([]))
          dispatch(setSearchResults([]))
          setCurrentPlayer(null)
      }

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