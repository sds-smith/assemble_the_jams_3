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
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect((): ReturnType<EffectCallback> => {
        if (nowPlaying.hasTrack) {
            audioPreview.src = nowPlaying.track.preview as string
            audioPreview.load()
            const src = audioPreview.src
            console.log('start play setting active true')
            console.log({src})
            setActive(true)
            audioPreview.play()
            audioPreview.onended = () => {setActive(false)}
        } else {
            audioPreview.src = ''
        }
        return (): void => {
            audioPreview.src = ''
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