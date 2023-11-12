import { FC, ButtonHTMLAttributes } from 'react';
import SrchBtn from '../../../assets/icons/search_white24.png';
import { FilterButtonContainer, FilterButton } from './search-filter-button.styles';

type SearchFilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SearchFilterButton: FC<SearchFilterButtonProps> = ({onClick, children}) => {
    return (
        <FilterButtonContainer >
            <FilterButton 
                onClick={onClick} 
            >
                {children}
                <img src={SrchBtn} alt='search'/>
            </FilterButton>
        </FilterButtonContainer>
    );
};

export default SearchFilterButton;