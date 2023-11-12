import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../contexts/player.context";

let audioPreview

export const useAudio = () => {
    const {nowPlaying, setNowPlaying, setActive} = useContext(PlayerContext);

    const [activeElement, setActiveElement] = useState({
        audio: false,
        spotify: false
    });

    useEffect(() => {
        if (nowPlaying?.hasTrack && audioPreview) {
            audioPreview.src = nowPlaying.track.preview 
            audioPreview.load()
            setActive(true)
            audioPreview.play()
            audioPreview.onended = () => {
                setActive(false);
                setNowPlaying(null);
            }
        } else {
            if (audioPreview) audioPreview.src = ''
            setActive(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying])

    const audioPlayer = () => {
        audioPreview = new Audio();
        audioPreview.volume = 0.5;
        setActiveElement({
            ...activeElement,
            audio: true
        })
    }

    return { audioPlayer }
}