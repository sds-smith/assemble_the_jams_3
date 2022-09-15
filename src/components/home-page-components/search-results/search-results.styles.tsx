import styled from "styled-components"
import { headerHeight } from '../../../routes/navigation/navigation.styles'
import { footerHeight } from '../footer/footer.styles'

type SearchResultsContainerProps = {
  isMobile: boolean;
}

const mobileHeight = `calc(0.9 * (100vh - ${headerHeight} - ${footerHeight}))`

export const SearchResultsContainer = styled.div<SearchResultsContainerProps>`
    width: ${props => props.isMobile ? '95%' : '40%'};
    min-height: 40vh;
    max-height: ${props => props.isMobile ? mobileHeight : '90vh'};
    overflow-y: scroll;
    padding: .88rem;
    margin: 10px;
    ${props => props.isMobile && 'margin-bottom: 200px'};
    background-color: rgba(0, 0, 0, 0.4) ;
    box-shadow: 0 4px 2px 2px #000000;

    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
`