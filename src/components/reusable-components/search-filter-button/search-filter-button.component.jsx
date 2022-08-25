
import SrchBtn from '../../../assets/icons/search_white24.png'

import { FilterButtonContainer } from './search-filter-button.styles'

const SearchFilterButton = ({onClick, children}) => {
    return (
        <FilterButtonContainer onClick={onClick} >{children}<img src={SrchBtn} alt='search'/></FilterButtonContainer>
    )
}

export default SearchFilterButton