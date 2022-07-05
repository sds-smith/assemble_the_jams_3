import styled from "styled-components";

export const Header = styled.div`
    background-color: black;
    border: 1px solid black;

    h1 {
        padding: .77rem 0;
        text-align: center;
        font-family: 'Poppins', sans-serif;
        font-size: 1.88rem;
        color: #fff;

        .highlight {
            color: green;
          }
      }
      
`

export const SpotifyAttributor = styled.a`
    position: absolute;
    top: 5px;
    left: 5px;
    
    p {
        font-size: 10px;
        color: white;
        padding-top: 2px;
        padding-left: 21px;
      }
`

export const SpotifyLogo = styled.img`
    width: 70px;
    height: auto;
`