import styled from "styled-components";

export const NowPlayingContainer = styled.div`
    position: relative;
    display: flex;
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

export const CloseButton = styled.button`
      position: absolute;
      top: 5px;
      right: 10px;
      background-color: rgba(0,0,0,0);
      border: none;

      &:hover {
        opacity: 0.5;
      }

      img {
        height: 17px;
        width: auto;
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
    z-index: 10;
`

export const ProgressContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .1);
    transform: ${props => props.transform};
    transform-origin: left;
    transition: transform 30s linear;
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