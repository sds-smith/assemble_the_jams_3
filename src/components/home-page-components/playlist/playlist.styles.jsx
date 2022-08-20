import styled from "styled-components";
import Button from "../../reusable-components/button/button.component";

export const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    width: ${props => props.isMobile ? '95%' : '40%'};
    max-height: 950px;
    padding: 0.88rem 1.16rem;
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 4px 2px 2px #000000;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
    border: 5px solid salmon;
    ${props => props.isMobile && 'flex-wrap: wrap'};

    input {
      display: block;
      font-size: 1.5em;
      margin: 0.83em 0em;
      font-weight: bold;
      border: 0;
      outline: 0;
      text-align: center;
      padding: 0;
      height: 1.7rem;
      background: transparent;
      font-family: 'Poppins', sans-serif;
      color: #fff;
      }

      img {
        height: 25%;
        width: auto;
        margin-top: 20px;
        margin-right: 0px;
      }
`

export const SaveToSpotifyButton = styled(Button)`
      margin: 1rem 0rem 0rem 1rem;
`