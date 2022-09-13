import { useState, useContext, FC, ButtonHTMLAttributes, ImgHTMLAttributes, MouseEvent, MouseEventHandler } from "react"
import { ResponsiveContext } from "../../../contexts/responsive.context"
import { TrackAction } from "./track-action-button.styles"

type TrackActionButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement> & ImgHTMLAttributes<HTMLImageElement>

const TrackActionButton: FC<TrackActionButtonProps> = ({onClick, src, alt}) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const { isMobile } = useContext(ResponsiveContext)
    
    const click = (e: MouseEvent<HTMLButtonElement>) => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 600)
        onClick(e)
    }

    return (
        <TrackAction 
            onClick={click}
            isMobile={isMobile}
            clicked={clicked}
        >
            <img src={src} alt={alt}/>
        </TrackAction>
    )
}

export default TrackActionButton