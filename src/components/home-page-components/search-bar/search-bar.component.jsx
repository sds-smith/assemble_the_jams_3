import { useState, useContext } from "react"
import { useDispatch } from "react-redux"

import Button from "../../reusable-components/button/button.component"

import { Spotify } from "../../../utils/spotify"
import { ClientContext } from "../../../contexts/client.context"

import { setSearchResults, setPlaylistTracks, setSearchLoading } from '../../../store/track/track.action'
    
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch()

    const {clientToken} = useContext(ClientContext)
    
    const search = async () => {

        dispatch(setSearchLoading(true))
        dispatch(setSearchResults([]))
        dispatch(setPlaylistTracks([]))
        const {searchResultsArray, recommendationsArray} = await Spotify.search(clientToken, searchTerm)
        
        setSearchTerm('')
        dispatch(setSearchResults(searchResultsArray))
        dispatch(setPlaylistTracks([...recommendationsArray]))
        dispatch(setSearchLoading(false))
    }

    const handleTermChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <SearchBarContainer onKeyPress={(e) => e.key === 'Enter' && search()}>
            <SearchBarInput placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} value={searchTerm}/>
            <Button onClick={search}>GENERATE PLAYLIST</Button>
        </SearchBarContainer>
    )
}

export default SearchBar