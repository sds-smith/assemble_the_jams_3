import { useState, useContext } from "react"
import { useDispatch } from "react-redux"

import Button from "../../reusable-components/button/button.component"
import SearchFilterButton from "../../reusable-components/search-filter-button/search-filter-button.component"

import { Spotify } from "../../../utils/spotify"
import { ClientContext } from "../../../contexts/client.context"

import { setSearchResults, setPlaylistTracks, setSearchLoading } from '../../../store/track/track.action'
    
import { SearchBarContainer, SearchBarInput, ButtonContainer, TermSelector } from "./search-bar.styles"

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)

    const dispatch = useDispatch()

    const {clientToken} = useContext(ClientContext)
    
    const filters = [
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

    const onFocus = () => {
        setSearchFocus(true)
    }

    const onBlur = () => {
        !searchTerm && setSearchFocus(false)
    }

    const search = async (filter) => {
        setSearchFocus(false)
        dispatch(setSearchLoading(true))
        dispatch(setSearchResults([]))
        dispatch(setPlaylistTracks([]))
        const query = filter ? `${filter}:"${searchTerm}"` : searchTerm
        const {searchResultsArray, recommendationsArray} = await Spotify.search(clientToken, query)
        
        setSearchTerm('')
        dispatch(setSearchResults(searchResultsArray))
        dispatch(setPlaylistTracks(recommendationsArray))
        dispatch(setSearchLoading(false))
    }

    const filteredSearch = (filter) => {
        search(filter)
    }

    const handleTermChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const clearTracklists = () => {
        dispatch(setSearchResults([]))
        dispatch(setPlaylistTracks([]))
    }

    return (
        <SearchBarContainer onKeyPress={(e) => e.key === 'Enter' && search()}>
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
                        <SearchFilterButton key={filter.id} onClick={()=>filteredSearch(filter.filter)} >
                            {filter.label} : {searchTerm}
                        </SearchFilterButton>)
                    )}
                </TermSelector>
            }
            <ButtonContainer>
                {/* <Button onClick={()=>search('')}>GENERATE PLAYLIST</Button> */}
                <Button onClick={clearTracklists}>CLEAR TRACKLISTS</Button>
            </ButtonContainer>

        </SearchBarContainer>
    )
}

export default SearchBar