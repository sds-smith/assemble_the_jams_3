import styled from "styled-components"

export const SearchResultsContainer = styled.div`
    width: ${props => props.isMobile ? '95%' : '30%'};
    min-height: 40vh;
    max-height: 90vh;
    overflow-y: scroll;
    padding: .88rem;
    background-color: rgba(0, 0, 0, 0.4) ;
    box-shadow: 0 4px 2px 2px #000000;
`