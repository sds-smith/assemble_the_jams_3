import { FC, ButtonHTMLAttributes, ImgHTMLAttributes } from "react"
import { TrackAction } from "./track-action-button.styles"

type TrackActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ImgHTMLAttributes<HTMLImageElement>

const TrackActionButton: FC<TrackActionButtonProps> = ({onClick, src, alt}) => {
    return (
        <TrackAction 
            onClick={onClick}
        >
            <img src={src} alt={alt}/>
        </TrackAction>
    )
}

export default TrackActionButton