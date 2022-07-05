
import { TrackAction } from "./track-action-button.styles"

const TrackActionButton = ({onClick, src, alt}) => {
    return (
        <TrackAction onClick={onClick}><img src={src} alt={alt}/></TrackAction>
    )
}

export default TrackActionButton