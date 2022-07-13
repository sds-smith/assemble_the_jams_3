
import Track from "../track/track.component"
import { TrackListContainer } from "./track-list.styles"

const TrackList = ({tracks, onPlay, onAdd, onRemove, trackType, nowPlaying}) => {

        return (
            <TrackListContainer>
                {tracks.map(track => (
                     <Track track={track} 
                            key={track.id}
                            onPlay={onPlay}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            nowPlaying={nowPlaying}
                            trackType={trackType}/> 
                    ))
                }
            </TrackListContainer>
        )
    
}

export default TrackList