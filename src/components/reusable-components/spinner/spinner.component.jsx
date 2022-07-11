import spinner from '../../../assets/icons/spinner_white48.png'

import { SpinnerContainer, SpinnerImg } from './spinner.styles'

const Spinner = ({loading}) => {

    return (
        <SpinnerContainer loading={loading} >
            <SpinnerImg src={spinner} loading={loading} alt='spinner'/>
             Loading . . .
        </SpinnerContainer>
    )
}

export default Spinner