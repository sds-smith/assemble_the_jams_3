import styled from "styled-components"

export const HomeHeroContainer = styled.div`
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