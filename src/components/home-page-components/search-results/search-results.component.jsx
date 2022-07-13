
import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = ({tracks, onAdd, onPlay, searchLoading, nowPlaying }) => {
    return (
        <SearchResultsContainer>
            <h2 >Search Results</h2>
            <Spinner loading={searchLoading} />
            <TrackList tracks={tracks} onAdd={onAdd} onPlay={onPlay} nowPlaying={nowPlaying} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults