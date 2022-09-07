import styled from "styled-components";

export const TrackContainer = styled.div`
    position: relative;
    display: flex;
    height: fit-content;
    align-items: center;
    border-bottom: 1px solid rgba(256, 256, 256, 0.8);
    margin-top: .5rem;
    padding-bottom: .5rem;
`

export const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const TrackCover = styled.img`
  width: 67px;
  height: auto;
  margin-right: 15px;
  z-index: 10;
`
export const TrackInformation = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 72px;
    z-index: 10;

    h3 {
        margin: 0px;
      }

    p {
      font-size: .83rem;
      font-weight: 300;
      margin: 0px;
      color: rgba(256, 256, 256, 0.8);
    }
`

export const TrackActionContainer = styled.div`
    display: flex;
`

export const SpotifyLogo = styled.img`
  width: 70px;
  height: auto;
  margin-top: 3px;
`