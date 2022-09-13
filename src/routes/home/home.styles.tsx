import styled from "styled-components";
import { ActivePlayer } from '../../utils/context.utils'

type HomeContainerProps = {
    activePlayer: ActivePlayer;
}

type HomeProps = {
    isMobile: boolean;
}

const audioElementBackground = 'linear-gradient(115deg, green, black)'
const spotifyBackground = 'linear-gradient(205deg, green, black)'

export const HomeContainer = styled.div<HomeContainerProps>`
    min-height: calc(100vh - 100px);
    position: relative;
    padding: 0 5% 10% 5%;
    background-image: ${props => props.activePlayer.spotify ? spotifyBackground : audioElementBackground};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    color: #ffffff;

`

export const InputContainer = styled.div<HomeProps>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'space-between'};
    width: 100%;
`

export const ResultsContainer = styled.div<HomeProps>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'center'};
    width: 100%;
`