import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux"

import { generateRandomString } from '../random-state-generator';
import { Spotify } from "../spotify"

import { PlayerContext } from "../../contexts/player.context"
import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { selectAuthSession } from '../../store/auth/auth.selector'
import { setPlaylistTracks, setPlaylistName, setSearchResults } from "../../store/track/track.action"



export const useSignIn = () => {
    const dispatch = useDispatch()
    const authSession = useSelector(selectAuthSession)
    const { setCurrentPlayer } = useContext(PlayerContext)

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
        dispatch(setPlaylistName('Name Your New Playlist'))
        dispatch(setPlaylistTracks([]))
        dispatch(setSearchResults([]))
        setCurrentPlayer(null)
    }

    return {signIn, signOut}
}