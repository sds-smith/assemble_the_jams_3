import { useState, useContext } from "react"

import Button from "../../reusable-components/button/button.component"

import { Spotify } from "../../../utils/spotify"
import { AuthContext } from "../../../contexts/auth.context"
import { PlayerContext } from "../../../contexts/player.context"
import { TrackContext } from "../../../contexts/track.context"
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const { accessToken } = useContext(AuthContext)
    const { currentPlayer } = useContext(PlayerContext)
    const { setSearchResults, setRecommendations, setSearchLoading } = useContext(TrackContext)
    
    const search = async () => {
        currentPlayer.activateElement()
        setSearchLoading(true)
        setSearchResults([])
        setRecommendations([])
        const {searchResultsArray, recommendationsArray} = await Spotify.search(accessToken, searchTerm)
        setSearchTerm('')
        setSearchResults(searchResultsArray)
        setRecommendations(recommendationsArray)
        setSearchLoading(false)
    }

    const handleTermChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <SearchBarContainer onKeyPress={(e) => e.key === 'Enter' && search()}>
            <SearchBarInput placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} value={searchTerm}/>
            <Button onClick={search}>SEARCH</Button>
        </SearchBarContainer>
    )
}

export default SearchBar