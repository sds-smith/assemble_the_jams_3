import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { setPlaylistTracks, setPlaylistName, setSearchResults } from "../../store/track/track.action"
import { selectAuthSession } from "../../store/auth/auth.selector"
import { PlayerContext } from "../../contexts/player.context"

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
          setCurrentPlayer(undefined)
      }

        const getAccessToken = async ( authCode ) => {
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
            const authCode = authCodeMatch[1]
            getAccessToken(authCode)
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