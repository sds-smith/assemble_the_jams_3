import { useEffect, AudioHTMLAttributes, FC, EffectCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectNowPlaying } from "../../store/player/player.selector";
import { setActiveAudioElement, setActive } from "../../store/player/player.action";
import Home from "../home/home.component";

const audioPreview = new Audio();
audioPreview.volume = 0.5;

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const dispatch = useDispatch()
    const nowPlaying = useSelector(selectNowPlaying)

    useEffect(() => {
        dispatch(setActiveAudioElement())
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect((): ReturnType<EffectCallback> => {
        if (nowPlaying.hasTrack) {
            audioPreview.src = nowPlaying.track.preview as string
            audioPreview.load()
            dispatch(setActive(true))
            audioPreview.play()
            audioPreview.onended = () => {
                dispatch(setActive(false))
            }
        } else {
            audioPreview.src = ''
        }
        return (): void => {
            audioPreview.src = ''
            audioPreview.remove()
            dispatch(setActive(false))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying])

    return (
        <Home/>
    )
}

export default AudioElement