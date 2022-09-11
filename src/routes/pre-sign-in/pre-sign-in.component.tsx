import { useContext, Fragment } from "react"
import Home from "../home/home.component";
import AudioElement from "../../components/home-page-components/audio-element/audio-element.component";
import { PlayerContext } from "../../contexts/player.context"

const PreSignIn = () => {
    const { nowPlaying } = useContext(PlayerContext)

    return (
        <Fragment>
            <Home/>
            {nowPlaying.hasTrack && <AudioElement/>}
        </Fragment>

    )
}

export default PreSignIn