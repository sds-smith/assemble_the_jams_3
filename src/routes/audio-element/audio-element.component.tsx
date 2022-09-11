import { useEffect, AudioHTMLAttributes, FC } from "react"
import { useContext } from "react"
import Home from "../home/home.component";
import { PlayerContext } from "../../contexts/player.context"

const audioPreview = new Audio();
audioPreview.volume = 0.5;

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const {nowPlaying} = useContext(PlayerContext)

    useEffect(() => {
        audioPreview.src = nowPlaying.track.preview as string
        audioPreview.load()
        audioPreview.play()
    }, [nowPlaying])

    return (
        <Home/>
    )
}

export default AudioElement