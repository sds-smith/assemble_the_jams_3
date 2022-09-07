import styled from "styled-components"

type SearchResultsContainerProps = {
  isMobile: boolean;
}

export const SearchResultsContainer = styled.div<SearchResultsContainerProps>`
    width: ${props => props.isMobile ? '95%' : '40%'};
    min-height: 40vh;
    max-height: 90vh;
    overflow-y: scroll;
    padding: .88rem;
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.4) ;
    box-shadow: 0 4px 2px 2px #000000;

    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
`