import { useNavigate } from "react-router-dom"

const LogIn = ({SpotifyAuth}) => {

    const navigate = useNavigate()



    return (
        <div>
            <a href={SpotifyAuth} >SIGN IN WITH SPOTIFY</a>
        </div>
    )
}

export default LogIn