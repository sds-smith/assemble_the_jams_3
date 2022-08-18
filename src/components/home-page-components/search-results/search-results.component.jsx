import { useSelector } from "react-redux"

import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { selectSearchResults, selectSearchLoading } from '../../../store/track/track.selector'
import { useMediaQuery } from '../../../utils/customHooks'
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = () => {
    const searchResults = useSelector(selectSearchResults)
    const searchLoading = useSelector(selectSearchLoading)
    const isMobile = useMediaQuery('(max-width: 1020px)')
    return (
        <SearchResultsContainer isMobile={isMobile} >
            <h2 >Search Results</h2>
            <Spinner loading={searchLoading} />
            <TrackList tracks={searchResults} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults