import styled from "styled-components";

export const HomeContainer = styled.div`
    min-height: calc(100vh - 100px);
    position: relative;
    padding: 0 5% 10% 5%;
    background-image: linear-gradient(135deg, green, black);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    color: #ffffff;
`

export const HomeHero = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const ResultsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

// background-image: linear-gradient(${props => props.gradientAngle}deg, green, black);
