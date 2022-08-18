import { useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"

import Button from "../../reusable-components/button/button.component"

import { Spotify } from "../../../utils/spotify"
import { selectAccessToken } from "../../../store/auth/auth.selector"
import { ClientContext } from "../../../contexts/client.context"
import { UserContext } from '../../../contexts/user.context'
import { PlayerContext } from "../../../contexts/player.context"
import { setSearchResults, setRecommendations, setPlaylistTracks, setSearchLoading } from '../../../store/track/track.action'
    
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch()

    const accessToken = useSelector(selectAccessToken)
    const {clientToken} = useContext(ClientContext)
    const { currentUser } = useContext(UserContext)
    const { currentPlayer } = useContext(PlayerContext)
    
    const search = async () => {
        currentPlayer.activateElement()
        dispatch(setSearchLoading(true))
        dispatch(setSearchResults([]))
        dispatch(setRecommendations([]))
        dispatch(setPlaylistTracks([]))
        const {searchResultsArray, recommendationsArray} = await Spotify.search(clientToken, searchTerm)
        
        setSearchTerm('')
        dispatch(setSearchResults(searchResultsArray))
        dispatch(setRecommendations(recommendationsArray))
        dispatch(setPlaylistTracks(recommendationsArray))
        dispatch(setSearchLoading(false))
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