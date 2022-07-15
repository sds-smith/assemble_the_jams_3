
import Track from "../track/track.component"
import { TrackListContainer } from "./track-list.styles"

const TrackList = ({tracks, onAdd, onRemove, trackType }) => {

        return (
            <TrackListContainer>
                {tracks.map(track => (
                     <Track track={track} 
                            key={track.id}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            trackType={trackType}/> 
                    ))
                }
            </TrackListContainer>
        )
    
}

export default TrackList