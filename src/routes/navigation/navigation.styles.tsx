import styled from "styled-components";
import Button from "../../components/reusable-components/button/button.component";

type NavigationProps = {
  isMobile: boolean;
};

type SignInButtonContainerProps = NavigationProps & {
  userExists: boolean;
};

export const headerHeight = '100px';

type NavigationContainerProps = {
  isMobile: boolean;
};

export const NavigationContainer = styled.div<NavigationContainerProps>`
  position: ${props => props.isMobile ? 'fixed' : 'unset'};
  top: 0px;
  left: 0px;
  width: 100%;
`;

export const Header = styled.div`
    background-color: black;
    border: 1px solid black;
    height: ${headerHeight};
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
`;

export const SignInButtonContainer = styled.div<SignInButtonContainerProps>`
  position: absolute;
  top: ${props => props.isMobile ? '5px' : '10px'};
  right: ${props => props.isMobile ? '5px' : '20px'};
  font-size: 12px;
  ${props => props.isMobile && 'width: 80px; height: 35px; font-size: 8px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.userExists ? 'black' : 'white'};
`;

export const SignInButton = styled(Button)<NavigationProps>`
${props => props.isMobile && 'width: 80px; height: 35px; font-size: 8px'};
`;

export const SpotifyAttributor = styled.a<NavigationProps>`
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
`;

export const SpotifyLogo = styled.img`
    width: 70px;
    height: 21px;
`;