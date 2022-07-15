import { useContext } from 'react'

import TrackList from '../../reusable-components/track-list/track-list.component'
import Spinner from '../../reusable-components/spinner/spinner.component'

import { TrackContext } from '../../../contexts/track.context'
import { useMediaQuery } from '../../../utils/customHooks'
import { RecommendationsContainer } from './recommendations.styles'

const Recommendations = () => {
        const { recommendations, searchLoading } = useContext(TrackContext)
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