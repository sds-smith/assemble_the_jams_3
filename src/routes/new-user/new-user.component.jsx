import { useEffect, useState } from "react"
import Button from "../../components/button/button.component"
import JamsLogo from "../../components/jams-logo/jams-logo.component"
import { RegistrationContainer, FormContainer  } from './new-user.styles'

const NewUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [transform, setTransform] = useState('scaleY(0)')
    const [formSubmitted, setFormSubmitted] = useState(false)

    const registrationMessage = `Thank you. Your request has been submitted. You will be notified at ${email} when your registration has been processed.`


    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
      }
  

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        // fetch('/', {
        //   method: 'POST',
        //   headers: {"Content-Type": "application/x-www-form-urlencoded"},
        //   body: encode({ "form-name": "registration", name, email })
        // })
        //   .then(() => {
        //     const userEmail = e.target.email.value
        //     this.props.setUserEmail(userEmail)
        //   })
        //   .catch(error => alert(error))
      }
    
    const handleChange = (e) => {
        e.target.name === 'name' ? setName(e.target.value) : setEmail(e.target.value)
      } 

    useEffect(() => {
        setTransform('scaleY(1)')
    },[])

    return (
        <RegistrationContainer >
            <FormContainer style={{transform : transform}} >
            <h2 className='loginMessage' ><JamsLogo /> works with your Spotify Premium account.</h2>
              {/* <img src={close} className="close" onClick={this.handleClick} alt='close button'/> */}
              {formSubmitted ? (
                  <h2 >{registrationMessage}</h2>
                ) : (
                  <form className='registration'  onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="registration" />
                    <input type='text' name='name' id='name' value={name} placeholder='Your First and Last Name' onChange={handleChange}/>
                    <input type='email' name='email' id='email' value={email} placeholder='Your Spotify email' onChange={handleChange}/>
                    <Button className='RegButton'type='submit' name='submit' id='emailSubmit' >REGISTER</Button>
                  </form>
                )
                }
              

            </FormContainer>

        </RegistrationContainer>
    )
}

export default NewUser