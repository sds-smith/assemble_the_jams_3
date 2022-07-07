import { useNavigate } from "react-router-dom"
import { LogInMessage } from "../../data/login-message"
import { Spotify } from "../../utils/spotify"
import { LogInContainer, FormContainer, Rollup, ButtonsContainer, ButtonContainer } from "./log-in.styles"
import Button from '../../components/reusable-components/button/button.component'
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"


const LogIn = () => {
    const navigate = useNavigate()
    const register = () => {
        navigate('/new-user')
    }
    const signIn = () => {
        Spotify.auth()
    }

    return (
        <LogInContainer>
            <FormContainer>
                <h2 className='loginMessage' ><JamsLogo /> works with your Spotify Premium account.</h2>
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
                    {LogInMessage.map((paragraph, index) => (
                        <h3 className='loginMessage' key={index} >{paragraph}</h3>
                    ))}
                    <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                    <h3 className='loginMessage'>Please Enjoy!</h3>
            </FormContainer>
        </LogInContainer>
    )
}

export default LogIn