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

export const TrackInformation = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 72px;

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