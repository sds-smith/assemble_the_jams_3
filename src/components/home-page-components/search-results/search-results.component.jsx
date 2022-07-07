
import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = ({tracks, onAdd, searchLoading}) => {
    return (
        <SearchResultsContainer>
            <h2 >Search Results</h2>
            <Spinner searchLoading={searchLoading} />
            <TrackList tracks={tracks} onAdd={onAdd} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults