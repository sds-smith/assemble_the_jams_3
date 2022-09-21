import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { generateRandomString } from '../random-state-generator';
import { Spotify } from "../spotify"

import { setCurrentPlayer, setdeviceId } from "../../store/player/player.action";
import { setAccessToken, setAuthSession, setRefreshToken, setExpiresAt } from "../../store/auth/auth.action"
import { selectAuthSession } from '../../store/auth/auth.selector'
import { setPlaylistTracks, setPlaylistName, setSearchResults } from "../../store/track/track.action"
import { setCurrentUser } from "../../store/user/user.action";
import { defaultCurrentUser } from "../../store/user/user.types";

export const useSignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authSession = useSelector(selectAuthSession)

    const signIn = async () => {
        const session = generateRandomString()
        dispatch(setAuthSession(session))
        try {
            const response = await fetch('/.netlify/functions/create-auth-doc', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ session })
            })
            const { codeChallenge, state} = await response.json()
            Spotify.auth(codeChallenge, state)
        } catch (error) {
          console.log(error)
        } 
    }
    
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
        dispatch(setRefreshToken(''))
        dispatch(setExpiresAt(0))
        dispatch(setPlaylistName('Name Your New Playlist'))
        dispatch(setPlaylistTracks([]))
        dispatch(setSearchResults([]))
        dispatch(setCurrentUser(defaultCurrentUser))
        dispatch(setCurrentPlayer(null))
        dispatch(setdeviceId(''))
        navigate('/')
    }

    return {signIn, signOut}
}
