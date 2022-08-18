import { useContext } from 'react'
import { useSelector } from 'react-redux'

import TrackList from '../../reusable-components/track-list/track-list.component'
import Spinner from '../../reusable-components/spinner/spinner.component'

import { selectRecommendations, selectSearchLoading } from '../../../store/track/track.selector'
import { useMediaQuery } from '../../../utils/customHooks'
import { RecommendationsContainer } from './recommendations.styles'

const Recommendations = () => {
        const recommendations = useSelector(selectRecommendations)
        const searchLoading = useSelector(selectSearchLoading)
        const isMobile = useMediaQuery('(max-width: 1020px)')

        return (
            <RecommendationsContainer isMobile={isMobile} >
              <h2>Recommendations</h2>
              <Spinner loading={searchLoading} />
              <TrackList 
                 tracks={recommendations} 
                 trackType={'recommendations'}/> 
            </RecommendationsContainer>
        )
}

export default Recommendations