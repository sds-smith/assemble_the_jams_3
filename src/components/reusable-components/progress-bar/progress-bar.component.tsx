import { useContext, FC } from "react";
import { PlayerContext } from "../../../contexts/player.context";
import { ProgressContainer } from "./progress-bar.styles";

type ProgressBarProps = {
    lightBackground?: boolean;
    darkBackground?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({lightBackground, darkBackground}) => {
    const { active } = useContext(PlayerContext)

    return (
        <ProgressContainer 
            active={active} 
            lightBackground={lightBackground} 
            darkBackground={darkBackground} 
        />
    )
}

export default ProgressBar