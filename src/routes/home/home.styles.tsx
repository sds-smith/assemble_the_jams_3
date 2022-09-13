import styled from "styled-components";

type HomeProps = {
    isMobile: boolean;
}

export const HomeContainer = styled.div`
    min-height: calc(100vh - 100px);
    position: relative;
    padding: 0 5% 10% 5%;
    background-image: linear-gradient(115deg, green, black);
    // background-image: linear-gradient(205deg, green, black);

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    color: #ffffff;

`

export const InputContainer = styled.div<HomeProps>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'space-between'};
    width: 100%;
`

export const ResultsContainer = styled.div<HomeProps>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'center'};
    width: 100%;
`