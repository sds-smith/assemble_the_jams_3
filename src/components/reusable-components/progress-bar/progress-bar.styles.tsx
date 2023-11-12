import styled from "styled-components";

type ProgressContainerProps = {
    active: boolean;
    transition: string;
    transform: string;
    lightBackground?: boolean;
    darkBackground?: boolean;
};

const lightBackground = 'rgba(255, 255, 255, .2)';
const darkBackground = 'rgba(0, 0, 0, .1)';

export const ProgressContainer = styled.div<ProgressContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${props => props.lightBackground ? lightBackground : darkBackground};
    transform: ${props => props.transform};
    transition: ${props => props.transition};
    transform-origin: left;
`;
