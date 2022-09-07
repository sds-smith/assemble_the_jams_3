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
    margin-bottom: 10px;

    p {
        margin-bottom: 0px;
        text-align: center;
    }
`