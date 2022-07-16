import styled from "styled-components";

export const WebPlayerContainer = styled.div`
    display: ${props => props.isMobile ? 'none' : 'flex'};
    width: 30%;
    height: ${props => props.isMobile ? '0px' : '300px'};
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
    border: solid salmon;
`