
import { generateRandomString } from "../../utils/random-state-generator"
import { useDispatch } from "react-redux"
import { setAccessToken, setAuthSession } from "../../store/auth/auth.action"
import { Spotify } from "../../utils/spotify"
import { useEffect, useContext } from "react"
import { UserContext } from "../../contexts/user.context"

const UserAction = () => {

    const dispatch = useDispatch()
    const { currentUser } = useContext(UserContext)

    useEffect(() => {

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
    
        const signOut = () => {
            dispatch(setAuthSession(''))
            dispatch(setAccessToken(''))
        }
    
        const userAction = () => {
            if (currentUser) {
                signOut()
            } else {
                signIn()
            }
        }
        userAction()

    }, [])

    return (
        <div></div>
    )
}

export default UserAction