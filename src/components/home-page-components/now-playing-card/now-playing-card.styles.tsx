import styled from "styled-components";

type NowPlayingContainerProps = {
    isMobile: Boolean;
}

type ProgressContainerProps = {
    backgroundColor: string;
    transform: string;
    transition: string;
}

export const NowPlayingContainer = styled.div<NowPlayingContainerProps>`
    position: relative;
    display: ${props => props.isMobile ? 'none' : 'flex'};
    width: 80%;
    height: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .6);
    padding: 20px;
    box-shadow: 2px;
`

export const SpotifyAttributor = styled.a`
    position: absolute;
    top: 5px;
    left: 10px;
    text-decoration: none;
    z-index: 10;

    &:hover {
        opacity: 0.5;
    }
    
    p {
        font-size: 10px;
        color: black;
        margin: 0px;
      }
`

export const SpotifyLogo = styled.img`
    width: 21px;
    height: auto;
`

export const NowPlayingCover = styled.img`
    height: 150px;
    width: auto;
    margin-bottom: 1rem;
    z-index: 10;
`

export const NowPlayingLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    z-index: 10;
`

export const TrackControls = styled.div`
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    z-index: 10;
`

export const ProgressContainer = styled.div<ProgressContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${props => props.backgroundColor};
    transform: ${props => props.transform};
    transform-origin: left;
    transition: ${props => props.transition};
`

export const LikesMessage = styled.p`
    position: absolute;
    bottom: 2.2rem;
    right: 10px;
    width: 7rem;
    height: 2rem;
    background-color: rgba(0,0,0,.6);
    border-radius: 1rem;
    font-size: .75rem;
    text-align: center;
    padding-top: 5px;
  
    &:empty {
      background-color: unset;
    }
`