import { FC, useState, useEffect, useContext, ReactNode } from "react"
import { TrackContext } from "../../../contexts/track.context";

import Track from "../track/track.component"

import { TrackListContainer } from "./track-list.styles"

type TrackListProps = {
    trackType: string;
}

const TrackList: FC<TrackListProps> = ({ trackType }) => {
    const { playlistTracks, searchResults } = useContext(TrackContext);
    const tracks = trackType === 'playlist' ? playlistTracks : searchResults 
    const [trackList, setTrackList] = useState<ReactNode[]>([])

    useEffect(() => {
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