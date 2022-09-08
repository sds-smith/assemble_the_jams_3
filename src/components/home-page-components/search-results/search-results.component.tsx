import { useSelector } from "react-redux"

import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { selectSearchLoading } from '../../../store/track/track.selector'
import { useMediaQuery } from '../../../utils/custom-hooks/use-media-query'
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = () => {
    const searchLoading = useSelector(selectSearchLoading)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    return (
        <SearchResultsContainer isMobile={isMobile} >
            <h2 >Search Term Matches</h2>
            <Spinner loading={searchLoading} />
            <TrackList trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults