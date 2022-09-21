import styled from "styled-components";

type ProgressContainerProps = {
    active: boolean;
    lightBackground?: boolean;
    darkBackground?: boolean;
}

const lightBackground = 'rgba(255, 255, 255, .2)'
const darkBackground = 'rgba(0, 0, 0, .1)'

export const ProgressContainer = styled.div<ProgressContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${props => props.lightBackground ? lightBackground : darkBackground};
    transform: scaleX(0);
    transition: ${props => props.active ? 'transform 30s linear' : 'transform 0s linear'};
    transform: ${props => props.active ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
`
