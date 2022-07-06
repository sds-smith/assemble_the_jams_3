import spinner from '../../../assets/icons/spinner_white48.png'

import { SpinnerContainer, SpinnerImg } from './spinner.styles'

const Spinner = () => {
    return (
        <SpinnerContainer >
            <SpinnerImg src={spinner} alt='spinner'/>
             Loading . . .
        </SpinnerContainer>
    )
}

export default Spinner