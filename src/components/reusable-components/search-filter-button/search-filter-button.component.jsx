

import { FilterButtonContainer } from './search-filter-button.styles'

const SearchFilterButton = ({onClick, children}) => {
    return (
        <FilterButtonContainer onClick={onClick} >{children}</FilterButtonContainer>
    )
}

export default SearchFilterButton