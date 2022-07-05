import { useNavigate } from "react-router-dom"
import { LogInMessage } from "../../data/login-message"
import { generateRandomString } from '../../utils/random-state-generator';
import { LogInContainer, FormContainer, Rollup, ButtonsContainer, ButtonContainer } from "./log-in.styles"
import Button from '../../components/reusable-components/button/button.component'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"

const scope = encodeURIComponent('user-read-private user-read-email')
const state = generateRandomString()
const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&state=${state}&code_challenge_method=S256&code_challenge=${process.env.REACT_APP_AUTH_CHALLENGE}&redirect_uri=http://localhost:8888/callback`

const LogIn = () => {

    const navigate = useNavigate()

    const register = () => {
        navigate('/new-user')
    }

    const signIn = () => {
        window.location.replace(SpotifyAuth)
    }

    return (
        <LogInContainer>
            <FormContainer>
                <h2 className='loginMessage' ><JamsLogo /> works with your Spotify Premium account.</h2>
                    {LogInMessage.map((paragraph, index) => (
                        <h3 className='loginMessage' key={index} >{paragraph}</h3>
                    ))}
                    <ButtonsContainer>
                        <ButtonContainer >
                            <h3>New Users</h3>
                            <Button onClick={register} >REGISTER</Button>
                            <p>Please register here</p>
                        </ButtonContainer>
                        <ButtonContainer >
                            <h3>Existing Users</h3>
                            <Button onClick={signIn} >SIGN IN</Button>
                            <p>Sign in with Spotify</p>
                        </ButtonContainer>
                    </ButtonsContainer>
                    <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                    <h3 className='loginMessage'>Please Enjoy!</h3>
            </FormContainer>
        </LogInContainer>
    )
}

export default LogIn