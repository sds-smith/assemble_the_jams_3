import { useState } from "react"

import { Spotify } from "../../../utils/spotify"
import Button from "../../reusable-components/button/button.component"
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = ({authSession, setSearchResults, setRecommendations, searchLoading, setSearchLoading}) => {

    const [searchTerm, setSearchTerm] = useState('')

    const search = async () => {
        setSearchLoading(searchLoading => !searchLoading)
        const {searchResultsArray, recommendationsArray} = await Spotify.search(authSession, searchTerm)
        setSearchTerm('')
        setSearchResults(searchResultsArray)
        setRecommendations(recommendationsArray)
        setSearchLoading(searchLoading => !searchLoading)
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