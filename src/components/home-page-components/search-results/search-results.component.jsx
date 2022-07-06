
import TrackList from "../../reusable-components/track-list/track-list.component"
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = ({tracks}) => {
    return (
        <SearchResultsContainer>
            <h2 >Search Results</h2>
            <TrackList tracks={tracks} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults