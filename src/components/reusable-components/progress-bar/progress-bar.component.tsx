import { FC } from "react";
import { useSelector } from "react-redux";
import { selectActive } from "../../../store/player/player.selector";
import { ProgressContainer } from "./progress-bar.styles";

type ProgressBarProps = {
    lightBackground?: boolean;
    darkBackground?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({lightBackground, darkBackground}) => {
    const active: boolean = useSelector(selectActive)
    console.log({active})

    const transition = active ? 'transform 30s linear' : 'transform 0s linear'
    const transform = active ? 'scaleX(1)' : 'scaleX(0)'

    return (
        <ProgressContainer 
            active={active}
            transform={transform}            
            transition={transition} 
            lightBackground={lightBackground} 
            darkBackground={darkBackground} 
        />
    )
}

export default ProgressBar