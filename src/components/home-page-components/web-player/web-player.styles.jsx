import styled from "styled-components";

export const WebPlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: inherit;
    width: 30%;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
`

export const Player = styled.div`
    position: relative;
    display: ${props => props.active ? 'flex' : 'none'};
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
    width: auto;
    height: 20px;
`

export const NowPlayingCover = styled.img`
    height: 150px;
    width: auto;
    margin-bottom: 1rem;
`

export const NowPlayingLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
`

export const TrackControls = styled.div`
    background-color: rgba(255, 255, 255, 0);
    display: flex;
`

export const ProgressContainer = styled.div`
    width: 100%;
    height: 1rem;
    font-size: .75rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: black;
`

export const ProgressBar = styled.div`
    width: 60%;
    height: 25%;
    border: 1px solid black;
`
export const ProgressFill = styled.div`
    height: 100%;
    background-color: black;
    width: ${props => props.width};
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