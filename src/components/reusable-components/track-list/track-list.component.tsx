import { FC, useState, useEffect, ReactNode } from "react"
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
    const [trackList, setTrackList] = useState<ReactNode[]>([])

    useEffect(() => {
        const tracks = trackType === 'playlist' ? playlistTracks : searchResults 
        if (tracks) {
            const trackList = tracks.map(track => (
                <Track track={track} 
                       key={track.id}
                       trackType={trackType}/> 
            ))
            setTrackList(trackList)
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playlistTracks, searchResults])

    return (
        <TrackListContainer>
            { trackList }
        </TrackListContainer>
    )
}

export default TrackList