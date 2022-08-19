import styled from "styled-components";
import Button from "../../components/reusable-components/button/button.component";

export const Header = styled.div`
    background-color: black;
    border: 1px solid black;
    height: 100px;
    border-bottom: .5px solid white;
    display: flex;
    justify-content: center;

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

export const SignInButton = styled(Button)`
  position: absolute;
  top: ${props => props.isMobile ? '5px' : '25px'};
  right: ${props => props.isMobile ? '5px' : '20px'};
  ${props => props.isMobile && 'width: 80px; height: 35px; font-size: 12px'};
`

export const SpotifyAttributor = styled.a`
    position: absolute;
    top: 5px;
    left: 5px;
    display: ${props => props.isMobile ? 'flex' : 'unset'};
    
    p {
        font-size: ${props => props.isMobile ? '8px' : '10px'};
        color: white;
        padding-top: ${props => props.isMobile ? '0px' : '2px'};
        padding-left: ${props => props.isMobile ? '0px' : '21px'};
      }
`

export const SpotifyLogo = styled.img`
    width: auto;
    height: 20px;
`