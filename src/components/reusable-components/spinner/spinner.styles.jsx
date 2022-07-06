import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const SpinnerContainer = styled.h3`
    display: none;
`

export const SpinnerImg = styled.img`
    width: 24px;
    height: auto;
    animation: ${rotate} 4s linear infinite;
    animation-play-state: paused;
`