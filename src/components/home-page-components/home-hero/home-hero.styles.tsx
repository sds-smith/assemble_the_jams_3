import styled from "styled-components"

type HomeHeroContainerProps = {
    isMobile: boolean;
}

export const HomeHeroContainer = styled.div<HomeHeroContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${props => props.isMobile ? '100%' : '30%'};
    margin: 10px 0px;

    .step4 {
        margin-top: 1rem;
    }
`

export const StepContainer = styled.div`
    text-align: center;    
`

export const Icon = styled.img`
    margin-bottom: -5px;
    height: 1rem;
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin-top: 20px;
`