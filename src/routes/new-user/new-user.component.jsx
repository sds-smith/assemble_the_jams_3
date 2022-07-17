import { useEffect, useState, useContext, Fragment } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/reusable-components/button/button.component"
import JamsLogo from "../../components/reusable-components/jams-logo/jams-logo.component"
import close from '../../assets/icons/close_white.png'

import { UserContext } from "../../contexts/user.context"
import { RegistrationContainer, FormContainer, CloseButton  } from './new-user.styles'
import { createUserDocumentFromReg } from "../../utils/firebase"

const NewUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailDisabled, setEmailDisabled] = useState(false)
    const [transform, setTransform] = useState('scaleY(0)')
    const [formSubmitted, setFormSubmitted] = useState(false)

    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const registrationMessage = `Thank you. Your request has been submitted. You will be notified at ${email} when your registration has been processed.`


    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }
  
    const postToFireBase = async () => {
      await createUserDocumentFromReg({name, email})
    }

    const postToNetlify = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        fetch('/', {
          method: 'POST',
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: encode({ "form-name": "registration", name, email })
        })
          .then(() => {
            postToFireBase()
          })
          .catch(error => alert(error))
      }
    
    const handleChange = (e) => {
        e.target.name === 'name' ? setName(e.target.value) : setEmail(e.target.value)
      } 

    const handleClick = () => {
      navigate('/log-in')
    }

    useEffect(() => {
        setTransform('scaleY(1)')
        if (currentUser) {
          setEmailDisabled(true)
          setEmail(currentUser.email)
        }
    },[currentUser])

    return (
        <RegistrationContainer >
            <FormContainer style={{transform : transform}} >
            <h2 className='loginMessage' ><JamsLogo /> works with your Spotify Premium account.</h2>
              <CloseButton src={close} onClick={handleClick} alt='close button'/>
              {formSubmitted ? (
                <Fragment>
                  <h2 >{registrationMessage}</h2>
                  <Button onClick={handleClick} >RETURN</Button>
                  <p>Return to Sign-In</p>                
                </Fragment>
                ) : (
                  <Fragment>
                    <p className='loginMessage' >Please complete the information below to register your account with <JamsLogo /></p>
                    <form className='registration'  onSubmit={postToNetlify}>
                      <input type="hidden" name="form-name" value="registration" />
                      <input type='text' name='name' id='name' value={name} placeholder='Your First and Last Name' onChange={handleChange}/>
                      <input type='email' name='email' id='email' value={email} placeholder='Your Spotify email'  disabled={emailDisabled} onChange={handleChange}/>
                      <Button className='RegButton'type='submit' name='submit' id='emailSubmit' >REGISTER</Button>
                    </form>
                  </Fragment>
                )}
            </FormContainer>
        </RegistrationContainer>
    )
}

export default NewUser