import { FC, ButtonHTMLAttributes } from 'react'
import SrchBtn from '../../../assets/icons/search_white24.png'
import { FilterButtonContainer } from './search-filter-button.styles'

type SearchFilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const SearchFilterButton: FC<SearchFilterButtonProps> = ({onClick, children}) => {
    return (
        <FilterButtonContainer 
            onClick={onClick} 
        >
            {children}
            <img src={SrchBtn} alt='search'/>
        </FilterButtonContainer>
    )
}

export default SearchFilterButton