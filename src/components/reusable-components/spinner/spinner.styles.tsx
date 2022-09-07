import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`
type SpinnerContainerProps = {
  display: string;
}

type SpinnerImgProps = {
  play: string;
}

export const SpinnerContainer = styled.h3<SpinnerContainerProps>`
    display: ${props => props.display};
`

export const SpinnerImg = styled.img<SpinnerImgProps>`
    width: 24px;
    height: auto;
    animation: ${rotate} 4s linear infinite;
    animation-play-state: ${props => props.play};
`