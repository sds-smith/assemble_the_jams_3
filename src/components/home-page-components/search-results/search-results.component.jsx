
import TrackList from "../../reusable-components/track-list/track-list.component"
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = ({tracks, onAdd}) => {
    return (
        <SearchResultsContainer>
            <h2 >Search Results</h2>
            <TrackList tracks={tracks} onAdd={onAdd} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults