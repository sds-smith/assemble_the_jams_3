
import { TrackListContainer } from "./track-list.styles"

const TrackList = ({tracks, onPlay, onAdd, onRemove, trackType}) => {
        return (
            <TrackListContainer>
                {/* {tracks.map(track => (
                    {/* // <Track  track={track} */}
                            {/* key={track.id}
                            onPlay={onPlay}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            trackType={trackType}/> */}
                    ))
                } */}
            </TrackListContainer>
        )
    
}

export default TrackList