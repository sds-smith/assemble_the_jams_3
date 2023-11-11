import { useState, useContext, FC, ChangeEvent } from "react"

import SearchFilterButton from "../../reusable-components/search-filter-button/search-filter-button.component"

import { httpSearch } from "../../../utils/http.requests"
import { ResponsiveContext } from "../../../contexts/responsive.context"
import { TrackContext } from "../../../contexts/track.context"

import { SearchBarContainer, SearchBarInput, TermSelector } from "./search-bar.styles"

type Search = (filter?: string) => void
type AsyncSearch = (filter?: string) => Promise<void>
type FilterObj = {
    id: number;
    label: string;
    filter: string;
}

const SearchBar: FC = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)
    const { isMobile, setMobilePlaylist } = useContext(ResponsiveContext)
    const { setSearchLoading, setSearchResults, setPlaylistTracks } = useContext(TrackContext);

    const filters: FilterObj[] = [
        {
            id : 1,
            label : 'Song',
            filter : 'song'
        },
        {   
            id : 2,
            label : 'Album',
            filter : 'album'
        },
        {
            id : 3,
            label : 'Artist',
            filter : 'artist'
        },
        {
            id : 4,
            label : 'Any',
            filter : ''
        }
    ]

    const onFocus = (): void => {
        setSearchFocus(true)
    }

    const onBlur = (): void => {
        !searchTerm && setSearchFocus(false)
    }

    const search: AsyncSearch = async (filter) => {
        setSearchFocus(false)
        setSearchLoading(true)

        const query = filter ? `${filter}:"${searchTerm}"` : searchTerm
        const response = await httpSearch(query)
        if (response) {
            const {searchResultsArray, recommendationsArray} = response
            setSearchTerm('')
            setSearchResults(searchResultsArray)
            setPlaylistTracks(recommendationsArray)
            setSearchLoading(false)
            isMobile && setMobilePlaylist()
        }
    }

    const filteredSearch: Search = (filter) => {
        search(filter)
    }

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value)
    }

    return (
        <SearchBarContainer onKeyPress={(e) => e.key === 'Enter' && search('')}>
            <SearchBarInput 
                placeholder="Enter A Song, Album, or Artist" 
                onFocus={onFocus} 
                onBlur={onBlur}
                onChange={handleTermChange} 
                value={searchTerm}
            />
            {searchFocus && 
                <TermSelector>
                    {filters.map((filter) => (
                        <SearchFilterButton 
                            key={filter.id} 
                            onClick={()=>filteredSearch(filter.filter)}
                            disabled={!searchTerm} 
                        >
                            {filter.label} : {searchTerm}
                        </SearchFilterButton>)
                    )}
                </TermSelector>
            } 
        </SearchBarContainer>
    )
}

export default SearchBar