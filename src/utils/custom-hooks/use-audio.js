import { useState, useEffect } from "react";

const nowPlaying = {hasTrack: false, track: {preview:''}};
let audioPreview

export const useAudio = () => {
    const [activeElement, setActiveElement] = useState({
        audio: false,
        spotify: false
    });

    useEffect(() => {
        if (nowPlaying.hasTrack && audioPreview) {
            audioPreview.src = nowPlaying.track.preview 
            audioPreview.load()
            // dispatch(setActive(true))
            audioPreview.play()
            // audioPreview.onended = () => {
            //     active && dispatch(setActive(false))
            // }
        } else {
            if (audioPreview) audioPreview.src = ''
            // active && dispatch(setActive(false))
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