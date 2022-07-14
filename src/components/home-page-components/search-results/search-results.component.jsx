import { useContext } from "react"

import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { TrackContext } from "../../../contexts/track.context"
import { SearchResultsContainer } from "./search-results.styles"
import Track from "../../reusable-components/track/track.component"

const SearchResults = ({ onAdd, onPlay }) => {
    const { searchResults, searchLoading } = useContext(TrackContext)

    return (
        <SearchResultsContainer>
            <h2 >Search Results</h2>
            <Spinner loading={searchLoading} />
            <TrackList tracks={searchResults} onAdd={onAdd} onPlay={onPlay} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults