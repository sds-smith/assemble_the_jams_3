import { useEffect, AudioHTMLAttributes, FC, Fragment, EffectCallback } from "react"
import { useContext } from "react"
import { PlayerContext } from "../../../contexts/player.context";

const audioPreview = new Audio();
audioPreview.volume = 0.5;

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const {nowPlaying} = useContext(PlayerContext)

    useEffect((): ReturnType<EffectCallback> => {
            audioPreview.src = nowPlaying.track.preview as string
            audioPreview.load()
            audioPreview.play()

            return (): void => {audioPreview.src = nowPlaying.track.preview as string}
    }, [nowPlaying])

    return (
        <Fragment/>
    )
}

export default AudioElement