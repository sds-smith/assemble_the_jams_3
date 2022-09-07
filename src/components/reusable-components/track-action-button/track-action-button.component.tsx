import { FC, ButtonHTMLAttributes, ImgHTMLAttributes } from "react"
import { TrackAction } from "./track-action-button.styles"

type ButtonProps = ImgHTMLAttributes<HTMLImageElement> & ButtonHTMLAttributes<HTMLButtonElement>

const TrackActionButton: FC<ButtonProps> = ({onClick, src, alt}) => {
    return (
        <TrackAction onClick={onClick}><img src={src} alt={alt}/></TrackAction>
    )
}

export default TrackActionButton