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
            console.log('audioPreview loaded, setting active true')
            dispatch(setActive(true))
            audioPreview.play()
            audioPreview.onended = () => {
                console.log('preview ended, setting active false')
                dispatch(setActive(false))
            }
        } else {
            audioPreview.src = ''
            console.log('no nowPlaying.hasTrack, setting active false')
            dispatch(setActive(false))
        }
        return (): void => {
            audioPreview.src = ''
            audioPreview.remove()
            console.log('unmounting, setting active false')
            dispatch(setActive(false))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying])

    return (
        <Home/>
    )
}

export default AudioElement