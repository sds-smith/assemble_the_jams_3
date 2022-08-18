import { useState, useContext } from "react"
import { useSelector } from "react-redux"

import Button from "../../reusable-components/button/button.component"

import { Spotify } from "../../../utils/spotify"
import { LastFM } from "../../../utils/last-fm"
import { selectAccessToken } from "../../../store/auth/auth.selector"
import { UserContext } from '../../../contexts/user.context'
import { PlayerContext } from "../../../contexts/player.context"
import { TrackContext } from "../../../contexts/track.context"
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const accessToken = useSelector(selectAccessToken)
    const { currentUser } = useContext(UserContext)
    const { currentPlayer } = useContext(PlayerContext)
    const { setSearchResults, setRecommendations, setPlaylistTracks, setSearchLoading } = useContext(TrackContext)
    
    const search = async () => {
        currentPlayer.activateElement()
        setSearchLoading(true)
        setSearchResults([])
        setRecommendations([])
        setPlaylistTracks([])

        const {searchResultsArray, recommendationsArray} = 
            currentUser ? await Spotify.search(accessToken, searchTerm)
                        : await LastFM.search(searchTerm)
        
        setSearchTerm('')
        setSearchResults(searchResultsArray)
        setRecommendations(recommendationsArray)
        setPlaylistTracks(recommendationsArray)
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