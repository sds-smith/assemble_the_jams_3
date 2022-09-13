import { useEffect, AudioHTMLAttributes, FC, EffectCallback } from "react"
import { useContext } from "react"
import Home from "../home/home.component";
import { PlayerContext } from "../../contexts/player.context"

const audioPreview = new Audio();
audioPreview.volume = 0.5;

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const { setActiveAudioElement, nowPlaying, setActive } = useContext(PlayerContext)

    useEffect(() => {
        setActiveAudioElement()
    }, [])

    useEffect((): ReturnType<EffectCallback> => {
        audioPreview.src = nowPlaying.track.preview as string
        audioPreview.load()
        if (audioPreview.src.length) {
            setActive(true)
            audioPreview.play()
            audioPreview.onended = () => setActive(false)
        }

        return (): void => {
            audioPreview.src = nowPlaying.track.preview as string
            audioPreview.remove()
            setActive(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying])

    return (
        <Home/>
    )
}

export default AudioElement