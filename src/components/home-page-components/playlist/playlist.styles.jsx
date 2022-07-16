import styled from "styled-components";
import Button from "../../reusable-components/button/button.component";

export const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: ${props => props.isMobile ? '95%' : '30%'};
    max-height: 950px;
    padding: 0.88rem 1.16rem;

    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 4px 2px 2px #000000;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    input {
      display: block;
      font-size: 1.5em;
      margin: 0.83em 0em;
      font-weight: bold;

      width: 100%;
      border: 0;
      outline: 0;
      text-align: center;
      padding: 0;
      height: 1.7rem;
      background: transparent;
      font-family: 'Poppins', sans-serif;
      color: #fff;
      }
`

export const SaveToSpotifyButton = styled(Button)`
      margin-top: 1rem;
`