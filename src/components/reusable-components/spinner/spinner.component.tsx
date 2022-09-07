import { FC, ImgHTMLAttributes } from 'react';
import spinner from '../../../assets/icons/spinner_white48.png'

import { SpinnerContainer, SpinnerImg } from './spinner.styles'

type SpinnerProps = {
    loading: boolean;
}


const Spinner = ({loading}: SpinnerProps) => {

    return (
        <SpinnerContainer display={loading ? 'block' : 'none'} >
            <SpinnerImg src={spinner} play={loading ? 'running' : 'paused'} alt='spinner'/>
             Loading . . .
        </SpinnerContainer>
    )
}

export default Spinner