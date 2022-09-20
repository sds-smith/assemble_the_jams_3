import { FC } from "react";
import { useSelector } from "react-redux";
import { selectActive } from "../../../store/player/player.selector";
import { ProgressContainer } from "./progress-bar.styles";

type ProgressBarProps = {
    lightBackground?: boolean;
    darkBackground?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({lightBackground, darkBackground}) => {
    const active = useSelector(selectActive)
    console.log({active})
    return (
        <ProgressContainer 
            active={active}
            lightBackground={lightBackground} 
            darkBackground={darkBackground} 
        />
    )
}

export default ProgressBar