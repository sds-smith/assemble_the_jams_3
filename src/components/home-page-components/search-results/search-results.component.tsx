import { useContext } from "react";

import TrackList from "../../reusable-components/track-list/track-list.component";
import Spinner from "../../reusable-components/spinner/spinner.component";

import { ResponsiveContext } from "../../../contexts/responsive.context";
import { TrackContext } from "../../../contexts/track.context";
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = () => {
    const { isMobile } = useContext(ResponsiveContext);
    const { searchLoading } = useContext(TrackContext);
    
    return (
        <SearchResultsContainer isMobile={isMobile} >
            <h2 >Search Term Matches</h2>
            <Spinner loading={searchLoading} />
            <TrackList trackType={'search-results'} />
        </SearchResultsContainer>
    );
};

export default SearchResults;