import { useState, useContext, FC, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"

import SearchFilterButton from "../../reusable-components/search-filter-button/search-filter-button.component"

import { Spotify } from "../../../utils/spotify"
import { ResponsiveContext } from "../../../contexts/responsive.context"

import { selectToken } from "../../../store/auth/auth.selector"
import { setSearchResults, setPlaylistTracks, setSearchLoading } from '../../../store/track/track.action'

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
    const token = useSelector(selectToken)

    const dispatch = useDispatch()

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
        dispatch(setSearchLoading(true))

        const query = filter ? `${filter}:"${searchTerm}"` : searchTerm
        const response = await Spotify.search(token, query)
        if (response) {
            const {searchResultsArray, recommendationsArray} = response
            setSearchTerm('')
            dispatch(setSearchResults(searchResultsArray))
            dispatch(setPlaylistTracks(recommendationsArray))
            dispatch(setSearchLoading(false))
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