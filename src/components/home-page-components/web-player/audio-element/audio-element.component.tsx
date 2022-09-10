import { useEffect, useMemo, Fragment, AudioHTMLAttributes, FC } from "react"
import { useContext } from "react"
import { PlayerContext } from "../../../../contexts/player.context"

const AudioElement: FC<AudioHTMLAttributes<HTMLAudioElement>> = () => {
    const {nowPlaying} = useContext(PlayerContext)

    const audioPreview = useMemo(() => {
        const audioPreview = new Audio();
        audioPreview.volume = 0.5;
        return audioPreview
    }, [])

    useEffect(() => {
        audioPreview.src = nowPlaying.track.preview as string
        if (nowPlaying.hasTrack) {
            audioPreview.play()
        } else {
            audioPreview.pause()
        }
    }, [nowPlaying, audioPreview])

    return (
        <Fragment>
        </Fragment>
    )
}

export default AudioElement