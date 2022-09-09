import { FC, ButtonHTMLAttributes } from 'react'
import { HashLinkProps } from 'react-router-hash-link'
import SrchBtn from '../../../assets/icons/search_white24.png'
import { FilterButtonContainer, FilterButton } from './search-filter-button.styles'

type SearchFilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & HashLinkProps

const SearchFilterButton: FC<SearchFilterButtonProps> = ({onClick, to, children}) => {
    return (
        <FilterButtonContainer to={to} >
            <FilterButton 
                onClick={onClick} 
            >
                {children}
                <img src={SrchBtn} alt='search'/>
            </FilterButton>
        </FilterButtonContainer>

    )
}

export default SearchFilterButton