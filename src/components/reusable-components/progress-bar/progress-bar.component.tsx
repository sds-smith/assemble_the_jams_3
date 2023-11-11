import { useContext, FC } from "react";
import { PlayerContext } from "../../../contexts/player.context";
import { ProgressContainer } from "./progress-bar.styles";

type ProgressBarProps = {
    lightBackground?: boolean;
    darkBackground?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({lightBackground, darkBackground}) => {
    const {active} = useContext(PlayerContext);

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