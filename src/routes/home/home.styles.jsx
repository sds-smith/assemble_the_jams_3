import styled from "styled-components";

export const HomeContainer = styled.div`
    min-height: calc(100vh - 100px);
    position: relative;
    padding: 0 5% 10% 5%;
    background-image: linear-gradient(115deg, green, black);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    color: #ffffff;
`

export const HomeHero = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'space-between'};
    width: 100%;
`

export const ResultsContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'space-between'};
    width: 100%;
`

export const TabContainer = styled.div`
    display: flex;
    width: calc(100% + .88rem);
    margin: 25px 0px 0px -2px;
    justify-content: flex-start;

`

export const Tab = styled.button`
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 30px;
    width: 40%;
    margin: 0px;
    background-color: rgba(0, 0, 0, 0.4) ;
    font-weight: ${props => props.active ? 'bold' : 'unset'};
    color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
    // box-shadow: ${props => props.active ? '0 0 0 2px #000000' : '0 4px 2px 2px #000000'};
    ${props => props.active ? (
        'border-left: 2px solid black; border-top: 2px solid black; border-right: 2px solid black'
        ) : (
        'border-left: 2px solid black; border-bottom: 4px solid black'
        )};
    

`