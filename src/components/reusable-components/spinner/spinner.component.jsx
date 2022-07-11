import spinner from '../../../assets/icons/spinner_white48.png'

import { SpinnerContainer, SpinnerImg } from './spinner.styles'

const Spinner = ({searchLoading}) => {

    return (
        <SpinnerContainer searchLoading={searchLoading} >
            <SpinnerImg src={spinner} searchLoading={searchLoading} alt='spinner'/>
             Loading . . .
        </SpinnerContainer>
    )
}

export default Spinner