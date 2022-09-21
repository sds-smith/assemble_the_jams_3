import { useEffect, AudioHTMLAttributes, FC, EffectCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectClientToken } from "../../store/auth/auth.selector";
import { setClientToken } from "../../store/auth/auth.action";
import { selectNowPlaying, selectActive } from "../../store/player/player.selector";
import { setActiveAudioElement, setActive } from "../../store/player/player.action";
import { Spotify } from "../../utils/spotify";
import Home from "../home/home.component";

const audioPreview = new Audio();
audioPreview.volume = 0.5;

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const dispatch = useDispatch()
    const clientToken = useSelector(selectClientToken)
    const nowPlaying = useSelector(selectNowPlaying)
    const active = useSelector(selectActive)

    useEffect(() => {
        dispatch(setActiveAudioElement())
        if (!clientToken) {
            const getClientToken = async () => {
              const response = await Spotify.getClientToken()
              if (response) {
                const { token, expires_in } = response
                dispatch(setClientToken(token) )       
                window.setTimeout(() => {
                  dispatch(setClientToken(''))
                }, expires_in * 1000)
              }
            }
              getClientToken()
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect((): ReturnType<EffectCallback> => {
        if (nowPlaying.hasTrack) {
            audioPreview.src = nowPlaying.track.preview as string
            audioPreview.load()
            dispatch(setActive(true))
            audioPreview.play()
            audioPreview.onended = () => {
                active && dispatch(setActive(false))
            }
        } else {
            audioPreview.src = ''
            active && dispatch(setActive(false))
        }
        return (): void => {
            audioPreview.src = ''
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying])

    return (
        <Home/>
    )
}

export default AudioElement