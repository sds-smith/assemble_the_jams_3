import { FC } from "react"
import { useSelector } from "react-redux"

import Track from "../track/track.component"

import { selectPlaylistTracks, selectSearchResults } from "../../../store/track/track.selector"
import { TrackListContainer } from "./track-list.styles"

type TrackListProps = {
    trackType: string;
}

const TrackList: FC<TrackListProps> = ({ trackType }) => {
    const playlistTracks = useSelector(selectPlaylistTracks)
    const searchResults = useSelector(selectSearchResults)
    const tracks = trackType === 'playlist' ? playlistTracks : searchResults 

    return (
        <TrackListContainer>
            {tracks && tracks.map(track => (
                 <Track track={track} 
                        key={track.id}
                        trackType={trackType}/> 
                ))
            }
        </TrackListContainer>
    )
    
}

export default TrackList